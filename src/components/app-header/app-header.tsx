import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppNavItem } from '../app-nav-item/app-nav-item';


export default function AppHeader() {
    return (
        <header className='pt-10 pb-10'>
            <nav className='display_flex display_flex_space_between'>
                <div>
                    <AppNavItem exact={true} className="p-5 mr-2 text text_type_main-default" path="/" text="Конструктор">
                        <span className='mr-2'>
                            <BurgerIcon type="primary" />
                        </span>
                    </AppNavItem>
                    <AppNavItem exact={true} className="p-5 mr-2 text text_type_main-default" path="/profile/orders" text="Лента заказов">
                        <span className='mr-2'>
                            <ListIcon type="primary" />
                        </span>
                    </AppNavItem>
                </div>
                <Logo />
                <div>
                    <AppNavItem exact={true} className="p-5 mr-2 text text_type_main-default" path="/profile" text="Личный кабинет">
                        <span className='mr-2'>
                            <ProfileIcon type="primary" />
                        </span>
                    </AppNavItem>
                </div>
            </nav>
        </header>
    )

};

