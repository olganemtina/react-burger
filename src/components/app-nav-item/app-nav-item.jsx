import React from 'react';
export default function AppNavItem(props) {
	return (
		<a href="#" className='p-5 mr-2 text text_type_main-default'>
			{props.children}
			<span className='pl-2'>{props.text}</span>
		</a>
	)
}

