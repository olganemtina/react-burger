import style from './app-nav-item.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function AppNavItem(props) {
	return (
		<NavLink exact={true} activeClassName={style.active} className={`${style.a_href} ${props.className} ${props.active ? style.active : ''}`} to={props.path}>
			{props.children}
			<span className={`${style.a_href_span}`}>{props.text}</span>
		</NavLink>
	)
}

AppNavItem.propTypes = {
	active: PropTypes.bool,
	text: PropTypes.string.isRequired,
	children: PropTypes.element,
	path: PropTypes.string,
	className: PropTypes.string
}

