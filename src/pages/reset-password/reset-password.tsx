import {
	Button,
	Input,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SyntheticEvent, useCallback, useState } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { AppError } from "../../components/app-error/app-error";
import { useForm } from "../../services/hooks/use-form";
import { IResetFormData } from "../../services/types/auth";
import { passwordResetStep2Request } from "../../utils/api/auth-api";
import { classNames } from "../../utils/class-names";

export const ResetPasswordPage = () => {
	const { formData, handleChange, setFormData } = useForm<IResetFormData>({
		token: "",
		password: "",
	});

	const [errorMsg, setErrorMsg] = useState("");

	const history = useHistory<{ from: string }>();

	const restoreHandler = useCallback(
		async (e: SyntheticEvent<HTMLFormElement>) => {
			e.preventDefault();
			const result = await passwordResetStep2Request(formData);
			if (result.success) {
				history.replace({ pathname: "/login" });
			} else {
				setErrorMsg(result.message);
			}
		},
		[formData]
	);

	if (history.location?.state?.from === "/forgot-password") {
		return (
			<div
				className={classNames(
					"form_container_center_page",
					"text_align_center"
				)}
			>
				<form onSubmit={(e) => restoreHandler(e)}>
					<h1 className="text text_type_main-medium">
						Восстановление пароля
					</h1>
					{errorMsg && <AppError error={errorMsg} />}
					<div className="mt-6">
						<PasswordInput
							onChange={(e) => handleChange(e)}
							value={formData.password}
							name={"password"}
						/>
					</div>
					<div className="mt-6">
						<Input
							type={"text"}
							placeholder={"Введите код из письма"}
							onChange={(e) => handleChange(e)}
							value={formData.token}
							error={false}
							name={"token"}
							size={"default"}
						/>
					</div>
					<div className="mt-6">
						<Button
							htmlType="submit"
							type="primary"
							size="medium"
						>
							Сохранить
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
	} else {
		return <Redirect to={{ pathname: "/forgot-password" }} />;
	}
};
