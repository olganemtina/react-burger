import classNames from "classnames";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { AppCollection } from "../../components/app-collection/app-collection";
import { FeedItem } from "../../components/feed-item/feed-item";
import { InfoCard } from "../../components/info-card/info-card";
import { startConnectionAction } from "../../services/action-creators/feed";
import { useFeedOrders } from "../../services/hooks/useFeedOrders";
import { RootState } from "../../services/types";
import { OrderStatus } from "../../services/types/status";
import { ordersAllWsUrl } from "../../services/variables/web-socket";
import {} from "../../utils/date-extensions";
import style from "./feed.module.scss";
import { v4 as uuidv4 } from "uuid";

export const FeedPage = () => {
	const history = useHistory();
	const location = useLocation<{ isModal: boolean }>();
	const dispatch = useDispatch();

	const { orders, total, totalToday } = useFeedOrders((x: RootState) => {
		return x.feed;
	});

	const doneOrders = useMemo(() => {
		return orders
			.filter((order) => order.status === OrderStatus.done)
			.map((item) => item.number.toString());
	}, [orders]);

	const pendingOrders = useMemo(() => {
		return orders
			.filter((order) => order.status === OrderStatus.pending)
			.map((item) => item.number.toString());
	}, [orders]);

	useEffect(() => {
		dispatch(startConnectionAction(ordersAllWsUrl));
	}, []);

	const openModalHandler = useCallback(
		(id: string) => {
			history.push({
				pathname: `/feed/${id}`,
				state: { isModal: true, from: location.pathname },
			});
		},
		[orders]
	);

	return (
		<main className="display_flex">
			<div
				className={classNames(
					"width_50_percent",
					style.scroll_container
				)}
			>
				<div className="text text_type_main-large mb-6">
					Лента заказов
				</div>
				<div className="pr-4">
					{orders.map((order) => (
						<div key={uuidv4()}>
							<FeedItem
								order={order}
								openModal={() =>
									openModalHandler(order._id)
								}
							/>
						</div>
					))}
				</div>
			</div>
			<div
				className={classNames(
					"width_50_percent",
					style.scroll_container
				)}
			>
				<div className="mt-25 ml-10">
					<div className="display_flex">
						<div className="width_50_percent">
							<AppCollection
								caption="Готовы"
								items={doneOrders}
								className="feed_state_active"
							/>
						</div>
						<div>
							<AppCollection
								caption="В работе"
								items={pendingOrders}
							/>
						</div>
					</div>
					<div>
						<div className="mb-15 mt-15">
							<InfoCard
								caption="Выполнено за все время:"
								count={total}
							/>
						</div>
						<div className="mb-15">
							<InfoCard
								caption="Выполнено за сегодня:"
								count={totalToday}
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};
