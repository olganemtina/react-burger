import classNames from "classnames";
import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { IAppCollection } from "../../services/types/collection";

export const AppCollection: FC<IAppCollection & { className?: string }> = ({
	caption,
	items,
	className,
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
					const partOtems = items.slice(start, finish);
					return (
						<div key={uuidv4()} className="mr-4 mb-4">
							{partOtems.map((item) => {
								return (
									<div
										key={uuidv4()}
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
