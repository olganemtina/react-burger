import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useCallback, useEffect, ReactNode, KeyboardEvent, SyntheticEvent } from 'react';
import { createPortal } from 'react-dom';
import {ModalOverlay} from '../modal-overlay/modal-overlay';
import style from './modal.module.css';


type TModalCloseEventType = SyntheticEvent | KeyboardEvent | Event;

interface IModal{
	header: string,
	onClose: (e: TModalCloseEventType)=>void,
	children: ReactNode
}

export const Modal:FC<IModal> = ({header, onClose, children}) => {

	const escapeHandler = useCallback((e: Event) => {
		onClose(e);
     }, []);

	 useEffect(()=>{

        document.addEventListener("keydown", escapeHandler, false);
        return ()=>{
            document.removeEventListener("keydown", escapeHandler, false);
        }
    },[]);

	const onCloseClick = useCallback((e: SyntheticEvent | KeyboardEvent)=>{
		if(e.target === e.currentTarget || (e.target as HTMLDivElement).closest(".close-button") || (e as KeyboardEvent).key === "Escape")
        {
			onClose(e);
		}
	}, []);



	return createPortal(
		<ModalOverlay onClose={onCloseClick}>
			<div className={`${style.modal_container} pt-10 pl-10 pr-10 pb-15`}>
				<div className='display_flex display_flex_space_between'>
					<div className='text text_type_main-large'>{header}</div>
					<div className='cursor_pointer close-button' onClick={onCloseClick}><CloseIcon type="primary" /></div>
				</div>
				{children}
			</div>
		</ModalOverlay>,
		document.body
	  );
}
