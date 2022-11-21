import classNames from "classnames";
import { FC, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { IIngredientDetails } from "../../services/types/ingredient";
import { AppAvatar } from "../app-avatar/app-avatar";
import style from "./app-avatar-list.module.scss";

export interface IAppAvatarList {
	items: ReadonlyArray<IIngredientDetails>;
	showCount: number;
}

export const AppAvatarList: FC<IAppAvatarList> = ({ items, showCount }) => {
	const splicedIngredientsData = useMemo(() => {
		return items.length > showCount
			? [...items].splice(0, showCount + 1).reverse()
			: items;
	}, [items.length, showCount]);

	const restCountIngredientsData = useMemo(() => {
		return items.length - splicedIngredientsData.length;
	}, [splicedIngredientsData.length, items.length]);

	return (
		<div
			className={classNames(
				"flex_direction_reverse",
				style.avatars_list
			)}
		>
			{restCountIngredientsData > 0 && (
				<div key={uuidv4()} className={style.avatar_container}>
					<AppAvatar
						imgUrl={items[items.length - 1].image_mobile}
						text={
							restCountIngredientsData > 1
								? `+${restCountIngredientsData.toString()}`
								: null
						}
					/>
				</div>
			)}
			{splicedIngredientsData.map((ingredient) => {
				return (
					<div key={uuidv4()} className={style.avatar_container}>
						<AppAvatar imgUrl={ingredient.image_mobile} />
					</div>
				);
			})}
		</div>
	);
};
