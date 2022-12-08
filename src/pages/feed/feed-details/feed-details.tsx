import { FeedDetails } from "../../../components/feed-details/feed-details";
import style from "./feed-details.module.scss";

export const FeedDetailsPage = () => {
	return (
		<div className="display_flex display_flex-center">
			<div className={style.feed_details_container}>
				<FeedDetails />
			</div>
		</div>
	);
};
