import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { FeedDetails } from "../../../components/feed-details/feed-details";
import { Modal } from "../../../components/modal/modal";
import { startConnectionAction } from "../../../services/action-creators/feed";
import { WS_FEED_CONNECTION_START } from "../../../services/action-types/feed";
import { FeedItemWithIngredients } from "../../../services/types/feed";
import { MatchParams } from "../../../services/types/routing";
import {
	ordersAllWsUrl,
	ordersUserWsUrl,
} from "../../../services/variables/web-socket";
import { getCookie } from "../../../utils/cookie";
import { useSelector } from "../../../utils/hooks";
import style from "./feed-details.module.scss";

export const FeedDetailsPage = () => {
	const history = useHistory<{ isModal: boolean; from: string }>();
	const dispatch = useDispatch();
	const [model, setModel] = useState<FeedItemWithIngredients | undefined>();
	const { params } = useRouteMatch<MatchParams>();
	const [isModal] = useState<boolean>(history.location.state?.isModal);
	const [from] = useState<string>(history.location.state?.from);

	const handleCloseModal = useCallback(() => {
		history.replace({ pathname: from });
	}, [from, isModal]);

	const order = useSelector((state) => {
		return state.feed;
	});

	const ingredients = useSelector((state) => {
		return [...state.ingredients.buns, ...state.ingredients.items];
	});

	useEffect(() => {
		if (!order.connected) {
			const url = (from || history.location.pathname)
				.slice(1)
				.split("/")[0];
			let wsUrl = ordersAllWsUrl;
			if (url == "profile") {
				const accessToken = getCookie("accessToken")?.replace(
					"Bearer ",
					""
				);
				wsUrl = `${ordersUserWsUrl}?token=${accessToken}`;
			}
			dispatch(startConnectionAction(wsUrl));
		}
	}, [order.connected]);

	useEffect(() => {
		if (order.connected) {
			let result = order.orders.find((x) => x._id === params.id);
			if (result) {
				let orderWithIngredients = new FeedItemWithIngredients(
					result
				);
				orderWithIngredients.setIngredients(ingredients);
				setModel(orderWithIngredients);
			}
		}
	}, [order.connected, order.orders]);

	if (model) {
		return (
			<div>
				{isModal ? (
					<Modal onClose={handleCloseModal}>
						<FeedDetails order={model} />
					</Modal>
				) : (
					<div className="display_flex display_flex-center">
						<div className={style.feed_details_container}>
							<FeedDetails order={model} />
						</div>
					</div>
				)}
			</div>
		);
	} else {
		return null;
	}
};
