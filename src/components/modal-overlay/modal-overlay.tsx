import { FC, SyntheticEvent } from 'react';
import style from './modal-overlay.module.css';

interface IModalOverlay{
	children: React.ReactNode,
	onClose: (e: SyntheticEvent)=>void
}

export const ModalOverlay: FC<IModalOverlay> = ({onClose, children})=>{
	return (
		<div onClick={onClose} className={`${style.modal_overlay} display_flex display_flex-center`}>
			{children}
		</div>
	)
}
