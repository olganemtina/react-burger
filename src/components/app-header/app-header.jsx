import React from 'react';
import style from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppNavItem from '../app-nav-item/app-nav-item';


export default function AppHeader() {
    return (
        <header className='pt-10 pb-10'>
            <nav className='display_flex display_flex_space_between'>
                <div>
                    <AppNavItem text="Конструктор">
                        <BurgerIcon type="primary" />
                    </AppNavItem>
                    <AppNavItem text="Лента заказов">
                        <ListIcon type="primary" />
                    </AppNavItem>
                </div>
                <Logo />
                <div>
                    <AppNavItem text="Личный кабинет">
                        <ProfileIcon type="primary" />
                    </AppNavItem>
                </div>
            </nav>
        </header>
    )

};

