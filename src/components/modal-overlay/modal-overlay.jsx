import React from 'react';
import style from './modal-overlay.module.css';

export default function ModalOverlay(props){
	return (
		<div onClick={props.onClose} className={style.modal_overlay + ' display_flex display_flex-center' }>
			{props.children}
		</div>
	)
}