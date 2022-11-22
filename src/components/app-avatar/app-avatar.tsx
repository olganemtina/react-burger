import { FC } from "react";
import { classNames } from "../../utils/class-names";
import style from "./app-avatar.module.scss";

export interface IAppAvatar {
	imgUrl?: string | null;
	text?: string | null;
}

export const AppAvatar: FC<IAppAvatar> = ({ imgUrl, text }) => {
	return (
		<div>
			<div
				className={classNames(
					style.avatar,
					text ? style.text_bg : ""
				)}
				style={{ backgroundImage: !text ? `url(${imgUrl})` : `` }}
			>
				{text && (
					<div className="text text_type_main-default">
						{text}
					</div>
				)}
			</div>
		</div>
	);
};
