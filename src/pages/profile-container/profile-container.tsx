import React, { FC, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AppNavItem } from "../../components/app-nav-item/app-nav-item";
import { signOut } from "../../services/action-types/user";
import { useAppDispatch } from "../../services/hooks/use-app-dispatch";
import style from "./profile-container.module.css";

export const ProfileContainerPage: FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const history = useHistory();
	const dispatch = useAppDispatch();

	const logoutHandler = useCallback(async () => {
		dispatch(signOut());
		history.replace({ pathname: "/login" });
	}, []);
	return (
		<div className="display_flex">
			<div className={style.width_30_percent}>
				<div className="pt-5 pb-5">
					<AppNavItem
						text="Профиль"
						exact
						className="text text_type_main-medium text_color_inactive text_decoration_none"
						path="/profile"
					/>
				</div>
				<div className="pt-5 pb-5">
					<AppNavItem
						text="История заказов"
						exact
						className="text text_type_main-medium text_color_inactive text_decoration_none"
						path="/profile/orders"
					/>
				</div>
				<div className="pt-5 pb-5 text text_type_main-medium text_color_inactive">
					<div
						className="text text_type_main-medium text_color_inactive text_decoration_none cursor_pointer"
						onClick={logoutHandler}
					>
						Выход
					</div>
				</div>
				<div className="mt-20 text text_type_main-default text_color_inactive">
					В этом разделе вы можете изменить свои персональные
					данные
				</div>
			</div>
			<div className="mr-15 width_100_percent">{children}</div>
		</div>
	);
};
