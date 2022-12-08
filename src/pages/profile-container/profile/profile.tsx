import {
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
	SyntheticEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { updateUser } from "../../../services/action-types/user";
import { useAppDispatch } from "../../../services/hooks/use-app-dispatch";
import { useAppSelector } from "../../../services/hooks/use-app-selector";
import { useForm } from "../../../services/hooks/use-form";
import { IRegisterFormData } from "../../../services/types/auth";

interface IInputsDisabledSettings {
	name?: boolean;
	email?: boolean;
	password?: boolean;
}

export const ProfilePage = () => {
	const user = useAppSelector((state) => {
		return state.user;
	});

	const dispatch = useAppDispatch();

	const [inputsDisabled, setInputDisabled] =
		useState<IInputsDisabledSettings>({
			name: true,
			email: true,
			password: true,
		});

	const [formChanged, setFormChanged] = useState<boolean>(false);

	const inputNameRef = useRef<HTMLInputElement>(null);
	const inputEmailRef = useRef<HTMLInputElement>(null);
	const inputPasswordRef = useRef<HTMLInputElement>(null);

	const { formData, handleChange, setFormData } = useForm<IRegisterFormData>(
		{
			name: "",
			email: "",
			password: "",
		}
	);

	useEffect(() => {
		setFormData({ ...user.data, password: "" } as IRegisterFormData);
	}, [user.data]);

	const setValue = (target: SyntheticEvent<HTMLInputElement>) => {
		handleChange(target);
		setFormChanged(true);
	};
	const onIconClick = (inputName: string) => {
		let newState: IInputsDisabledSettings = Object.entries(
			inputsDisabled
		).reduce((newObj, item) => {
			newObj[item[0] as keyof IInputsDisabledSettings] = true;
			return newObj;
		}, {} as IInputsDisabledSettings);
		newState[inputName as keyof IInputsDisabledSettings] = false;
		setInputDisabled(newState);
	};

	useEffect(() => {
		if (!inputsDisabled.name) {
			inputNameRef.current?.focus();
		}
		if (!inputsDisabled.email) {
			inputEmailRef.current?.focus();
		}
		if (!inputsDisabled.password) {
			inputPasswordRef.current?.focus();
		}
	}, [inputsDisabled]);

	const saveHandler = useCallback(async () => {
		dispatch(updateUser(formData));
		setFormChanged(false);
	}, [formData]);

	const cancelHandler: () => void = useCallback(() => {
		setFormData({ ...user.data, password: "" } as IRegisterFormData);
		setFormChanged(false);
	}, []);

	return (
		<div>
			<div className="mb-6">
				<Input
					type={"text"}
					placeholder={"Имя"}
					onChange={(e) => setValue(e)}
					icon={"EditIcon"}
					value={formData.name}
					name={"name"}
					error={false}
					ref={inputNameRef}
					disabled={inputsDisabled.name}
					onIconClick={(e) => onIconClick("name")}
					errorText={"Ошибка"}
					size={"default"}
				/>
			</div>
			<div className="mb-6">
				<Input
					type={"text"}
					placeholder={"Логин"}
					onChange={(e) => setValue(e)}
					icon={"EditIcon"}
					value={formData.email}
					name={"email"}
					error={false}
					ref={inputEmailRef}
					disabled={inputsDisabled.email}
					onIconClick={(e) => onIconClick("email")}
					errorText={"Ошибка"}
					size={"default"}
				/>
			</div>
			<div className="mb-6">
				<Input
					type={"password"}
					placeholder={"Пароль"}
					onChange={(e) => setValue(e)}
					icon={"EditIcon"}
					value={formData.password}
					name={"password"}
					error={false}
					ref={inputPasswordRef}
					disabled={inputsDisabled.password}
					onIconClick={(e) => onIconClick("password")}
					errorText={"Ошибка"}
					size={"default"}
				/>
			</div>
			<div>
				{formChanged && (
					<div>
						<Button
							htmlType="button"
							type="primary"
							size="medium"
							onClick={saveHandler}
						>
							Сохранить
						</Button>
						<Button
							htmlType="reset"
							onClick={cancelHandler}
							type="secondary"
							size="medium"
						>
							Отмена
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};
