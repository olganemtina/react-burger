import {
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import { AppError } from "../../components/app-error/app-error";
import { NavLink, useHistory } from "react-router-dom";
import { passwordResetStep1Request } from "../../utils/api/auth-api";

export const ForgotPasswordPage = () => {
	const history = useHistory();
	const [email, setEmail] = useState<string>("");
	const [errorMsg, setErrorMsg] = useState<string>();

	const restoreHandler = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const result = await passwordResetStep1Request({
				email: email,
			});
			if (result.success) {
				history.replace({
					pathname: "/reset-password",
					state: { from: "/forgot-password" },
				});
			} else {
				setErrorMsg(result.message);
			}
		},
		[email]
	);
	return (
		<div
			className={`display_flex display_flex-center text_align_center mt-6`}
		>
			<form onSubmit={(e) => restoreHandler(e)}>
				<h1 className="text text_type_main-medium">
					Восстановление пароля
				</h1>
				{errorMsg && <AppError error={errorMsg} />}
				<div className="mt-6">
					<Input
						type={"text"}
						placeholder={"Укажите e-mail"}
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						name={"e-mail"}
						error={false}
						size={"default"}
					/>
				</div>
				<div className="mt-6">
					<Button htmlType="submit" type="primary" size="medium">
						Восстановить
					</Button>
				</div>
				<div className="mt-20">
					<span className="text text_type_main-default text_color_inactive">
						Вспомнили пароль?{" "}
					</span>
					<span>
						<NavLink
							className="text text_type_main-default text_color_inactive nav_link"
							to="/login"
						>
							Войти
						</NavLink>
					</span>
				</div>
			</form>
		</div>
	);
};
