import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent, useCallback, useState } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { AppError } from '../../components/app-error/app-error';
import { IResetFormData } from '../../services/types/auth';
import { passwordResetStep2Request } from '../../utils/api/auth-api';

export const ResetPasswordPage = () => {
	const [formData, setFormData] = useState<IResetFormData>({
		token: "",
		password: ""
	});
	const [errorMsg, setErrorMsg] = useState("");

	const history = useHistory<{ from: string }>();

	const setValue = (target: HTMLInputElement) => {
		const {name, value} = target;
		setFormData({
			...formData,
			[name]: value
		})
	}

	const restoreHandler = useCallback(async(e: SyntheticEvent<HTMLFormElement>)=>{
		e.preventDefault();
		const result = await passwordResetStep2Request(formData);
		if(result.success)
		{
			history.replace({pathname: "/login"});
		}
		else
		{
			setErrorMsg(result.message);
		}
	}, [formData]);

	if(history.location?.state?.from === "/forgot-password")
	{
		return(
			<div className={`display_flex display_flex-center text_align_center vh-100`}>
				<form onSubmit={(e)=>restoreHandler(e)}>
					<h1 className="text text_type_main-medium">Восстановление пароля</h1>
					{errorMsg && <AppError error={errorMsg}/>}
					<div className='mt-6'>
						<PasswordInput onChange={e => setValue(e.target)} value={formData.password} name={'password'} />
					</div>
					<div className='mt-6'>
						<Input
							type={'text'}
							placeholder={'Введите код из письма'}
							onChange={e => setValue(e.target)}
							value={formData.token}
							error={false}
							name={'token'}
							size={'default'}
							/>
					</div>
					<div className='mt-6'>
						<Button htmlType="button" type="primary" size="medium">
							Сохранить
						</Button>
					</div>
					<div className='mt-20'>
						<span className='text text_type_main-default text_color_inactive'>Вспомнили пароль? </span>
						<span>
							<NavLink className='text text_type_main-default text_color_inactive nav_link' to="/login">
								Войти
							</NavLink>
						</span>
					</div>
				</form>
			</div>
		)
	}
	else
	{
		return <Redirect to={{pathname: "/forgot-password"}} />
	}
}