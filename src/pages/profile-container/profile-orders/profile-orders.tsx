import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { FeedItem } from "../../../components/feed-item/feed-item";
import { startConnectionAction } from "../../../services/action-creators/feed";
import { useFeedOrders } from "../../../services/hooks/useFeedOrders";
import { RootState } from "../../../services/types";
import { ordersUserWsUrl } from "../../../services/variables/web-socket";
import { getCookie } from "../../../utils/cookie";
import style from "./profile-orders.module.scss";
import { v4 as uuidv4 } from "uuid";

export const ProfileOrdersPage = () => {
	const dispatch = useDispatch();
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
					<div key={uuidv4()}>
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
