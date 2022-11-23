import {
	Button,
	Input,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SyntheticEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { AppError } from "../../components/app-error/app-error";
import { signUp } from "../../services/action-types/user";
import { IRegisterFormData } from "../../services/types/auth";
import { useSelector } from "../../utils/hooks";

export const RegisterPage = () => {
	const dispatch = useDispatch();

	const [formSended, setFormSended] = useState(false);

	const [formData, setFormData] = useState<IRegisterFormData>({
		name: "",
		email: "",
		password: "",
	});

	const user = useSelector((state) => {
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

	const setValue = (e: SyntheticEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	if (!user.loaded) {
		return <Redirect to="/" />;
	}

	return (
		<div
			className={`display_flex display_flex-center text_align_center vh-100`}
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
						onChange={(e) => setValue(e)}
						value={formData.name}
						name={"name"}
						size={"default"}
					/>
				</div>
				<div className="mt-6">
					<Input
						type={"text"}
						placeholder={"E-mail"}
						onChange={(e) => setValue(e)}
						value={formData.email}
						name={"email"}
						size={"default"}
					/>
				</div>
				<div className="mt-6">
					<PasswordInput
						onChange={(e) => setValue(e)}
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
