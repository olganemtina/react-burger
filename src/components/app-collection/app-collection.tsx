import { FC } from "react";
import { IAppCollection } from "../../services/types/collection";
import { classNames } from "../../utils/class-names";

export const AppCollection: FC<IAppCollection & { className?: string }> = ({
	caption,
	items,
	className = "",
	itemCountInRow = 10,
}) => {
	var cssClass = classNames("mb-2", className);
	const rowCount = Math.ceil(items.length / itemCountInRow);
	return (
		<div>
			<div className="text text_type_main-medium mb-6">{caption}</div>
			<div className="text text_type_digits-default display_flex flex-wrap">
				{Array.from(Array(rowCount).keys()).map((row, index) => {
					const start = index * itemCountInRow;
					const finish =
						index < rowCount
							? (index + 1) * itemCountInRow
							: items.length + 1;
					const partItems = items.slice(start, finish);
					return (
						<div key={row} className="mr-4 mb-4">
							{partItems.map((item) => {
								return (
									<div
										key={item}
										className={cssClass}
									>
										{item}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};
