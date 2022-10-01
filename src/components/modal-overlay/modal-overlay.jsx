import style from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay(props){
	return (
		<div onClick={props.onClose} className={`${style.modal_overlay} display_flex display_flex-center`}>
			{props.children}
		</div>
	)
}

ModalOverlay.propTypes = {
	children: PropTypes.element,
	onClose: PropTypes.func.isRequired,
};
