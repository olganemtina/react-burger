import { FC } from "react";

export const InfoCard: FC<{caption: string, count: number | null}> = ({caption, count}) =>{
	return(
		<div>
			<div className="text text_type_main-medium">{caption}</div>
			<div className="text text_type_digits-large">{count}</div>
		</div>
	)
}