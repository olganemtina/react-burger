import { useCallback, useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import { FeedItem } from "../../../components/feed-item/feed-item";
import {
	closeFeedConnectionAction,
	startConnectionAction,
} from "../../../services/action-creators/feed";
import { useAppDispatch } from "../../../services/hooks/use-app-dispatch";
import { useFeedOrders } from "../../../services/hooks/use-feed-orders";
import { RootState } from "../../../services/types";
import { ordersUserWsUrl } from "../../../services/constants/web-socket";
import { getCookie } from "../../../utils/cookie";
import style from "./profile-orders.module.scss";

export const ProfileOrdersPage = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const history = useHistory();

	const { orders, total, totalToday } = useFeedOrders(
		(x: RootState) => x.feed
	);

	const ordersDesc = useMemo(() => {
		return [...orders].sort((a, b) =>
			a.createdAt < b.createdAt ? 1 : -1
		);
	}, [orders]);

	useEffect(() => {
		const accessToken = getCookie("accessToken")?.replace("Bearer ", "");
		dispatch(
			startConnectionAction(`${ordersUserWsUrl}?token=${accessToken}`)
		);
		return function () {
			dispatch(
				closeFeedConnectionAction("Соединение с сокетом завершено")
			);
		};
	}, []);

	const openModalHandler = useCallback(
		(id: string) => {
			history.push({
				pathname: `/profile/orders/${id}`,
				state: { isModal: true, from: location.pathname },
			});
		},
		[orders]
	);

	return (
		<div className={style.scroll_container}>
			<div className="mr-2">
				{ordersDesc?.map((order) => (
					<div key={order._id}>
						<FeedItem
							order={order}
							showStatus={true}
							openModal={() => openModalHandler(order._id)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
