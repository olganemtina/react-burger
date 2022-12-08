import { useCallback, useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import { AppCollection } from "../../components/app-collection/app-collection";
import { FeedItem } from "../../components/feed-item/feed-item";
import { InfoCard } from "../../components/info-card/info-card";
import {
	closeFeedConnectionAction,
	startConnectionAction,
} from "../../services/action-creators/feed";
import { useAppDispatch } from "../../services/hooks/use-app-dispatch";
import { useFeedOrders } from "../../services/hooks/use-feed-orders";
import { RootState } from "../../services/types";
import { OrderStatus } from "../../services/types/status";
import { ordersAllWsUrl } from "../../services/constants/web-socket";
import { classNames } from "../../utils/class-names";
import {} from "../../utils/date-extensions";
import style from "./feed.module.scss";
import { FeedItemWithIngredients } from "../../services/types/feed";

export const FeedPage = () => {
	const history = useHistory();
	const location = useLocation<{ isModal: boolean }>();
	const dispatch = useAppDispatch();

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
		return function () {
			dispatch(
				closeFeedConnectionAction("Соединение с сокетом завершено")
			);
		};
	}, []);

	const openModalHandler = useCallback(
		(id: string) => {
			history.push({
				pathname: `/feed/${id}`,
				state: { background: location },
			});
		},
		[dispatch, orders]
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
					{orders.map((order, index) => (
						<div key={`${order._id}_${index}`}>
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
