import { FC } from 'react';

export const AppLoad : FC<{text: string}> = ({text})=>{
	return (
		<div>
			{text}
		</div>
	)
}

