import style from './app-nav-item.module.css';
import PropTypes from 'prop-types';

export default function AppNavItem(props) {
	return (
		<a className={`${style.a_href} p-5 mr-2 text text_type_main-default ${props.active ? style.active : ''}`} href="#">
			{props.children}
			<span className={`${style.a_href_span} pl-2`}>{props.text}</span>
		</a>
	)
}

AppNavItem.propTypes = {
	active: PropTypes.bool,
	text: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired
}

