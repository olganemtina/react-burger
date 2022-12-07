import {
	Button,
	Input,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SyntheticEvent, useCallback, useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { AppError } from "../../components/app-error/app-error";
import { signUp } from "../../services/action-types/user";
import { useAppDispatch } from "../../services/hooks/use-app-dispatch";
import { useAppSelector } from "../../services/hooks/use-app-selector";
import { useForm } from "../../services/hooks/use-form";
import { IRegisterFormData } from "../../services/types/auth";
import { classNames } from "../../utils/class-names";

export const RegisterPage = () => {
	const dispatch = useAppDispatch();

	const [formSended, setFormSended] = useState(false);

	const { formData, handleChange, setFormData } = useForm<IRegisterFormData>(
		{
			name: "",
			email: "",
			password: "",
		}
	);

	const user = useAppSelector((state) => {
		return state.user;
	});

	const registerClickHandler = useCallback(
		(e: SyntheticEvent<HTMLFormElement>) => {
			e.preventDefault();
			dispatch(signUp(formData));
			setFormSended(true);
		},
		[formData]
	);

	if (!user.loaded) {
		return <Redirect to="/" />;
	}

	return (
		<div
			className={classNames(
				"form_container_center_page",
				"text_align_center"
			)}
		>
			<form onSubmit={(e) => registerClickHandler(e)}>
				<h1 className="text text_type_main-medium">Регистрация</h1>
				{formSended && user.error && (
					<AppError error={user.error} />
				)}
				<div className="mt-6">
					<Input
						type={"text"}
						placeholder={"Имя"}
						onChange={(e) => handleChange(e)}
						value={formData.name}
						name={"name"}
						size={"default"}
					/>
				</div>
				<div className="mt-6">
					<Input
						type={"text"}
						placeholder={"E-mail"}
						onChange={(e) => handleChange(e)}
						value={formData.email}
						name={"email"}
						size={"default"}
					/>
				</div>
				<div className="mt-6">
					<PasswordInput
						onChange={(e) => handleChange(e)}
						value={formData.password}
						name={"password"}
					/>
				</div>
				<div className="mt-6">
					<Button htmlType="submit" type="primary" size="medium">
						Зарегистрироваться
					</Button>
				</div>
				<div className="mt-20">
					<span className="text text_type_main-default text_color_inactive">
						Уже зарегистрированы?{" "}
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
