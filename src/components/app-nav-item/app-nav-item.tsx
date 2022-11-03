import { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import style from './app-nav-item.module.css';

interface IAppNavItem{
	className?: string;
	active?: boolean;
	exact?: boolean;
	text: string;
	path: string
}

export const AppNavItem: FC<PropsWithChildren<IAppNavItem>> = ({className, active, path, text, children, exact }) =>  {
	return (
		<NavLink exact={exact} activeClassName={style.active} className={`${style.a_href} ${className} ${active ? style.active : ''}`} to={path}>
			{children}
			<span className={`${style.a_href_span}`}>{text}</span>
		</NavLink>
	)
}