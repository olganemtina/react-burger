import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import style from './modal.module.css'
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function Modal(props){

	const escapeHandler = useCallback((e)=>{
		props.onClose(e);
     }, [])

    useEffect(()=>{
        document.addEventListener("keydown", escapeHandler, false);
        return ()=>{
            document.removeEventListener("keydown", escapeHandler, false);
        }
    },[]);

	return createPortal(
		<ModalOverlay onClose={props.onClose}>
			<div className={style.modal_container + " pt-10 pl-10 pr-10 pb-15"}>
				<div className='display_flex display_flex_space_between'>
					<div className='text text_type_main-large'>{props.header}</div>
					<div className='cursor_pointer close-button' onClick={props.onClose}><CloseIcon type="primary" /></div>
				</div>
				{props.children}
			</div>
		</ModalOverlay>,
		document.body
	  );
}