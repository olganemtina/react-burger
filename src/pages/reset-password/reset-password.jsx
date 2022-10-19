import { Input, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useProvideAuth } from '../../services/custom-hooks/use-provide-auth';

export default function ResetPasswordPage() {
	const [formData, setFormData] = useState({
		token: "",
		password: ""
	});
	const [errorMsg, setErrorMsg] = useState("");

	const auth = useProvideAuth();
	const history = useHistory();

	const setValue = (target) => {
		const {name, value} = target;
		setFormData({
			...formData,
			[name]: value
		})
	}

	const restoreHandler = useCallback(async(e)=>{
		e.preventDefault();
		const result = await auth.passwordResetStep2(formData);
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
					<div className='mt-6'>
						<PasswordInput onChange={e => setValue(e.target)} value={formData.password} name={'password'} />
					</div>
					<div className='mt-6'>
						<Input
							type={'text'}
							placeholder={'Введите код из письма'}
							onChange={e => setValue(e.target)}
							value={formData.token}
							name={'token'}
							error={false}
							errorText={'Ошибка'}
							size={'default'}
							/>
					</div>
					<div className='mt-6'>
						<Button type="primary" size="medium">
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
				<div>{errorMsg}</div>
			</div>
		)
	}
	else
	{
		return <Redirect to={{pathname: "/forgot-password"}} />
	}
}