import { Input, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useProvideAuth } from '../../services/custom-hooks/use-provide-auth';

export default function LoginPage() {
	let auth = useProvideAuth();

	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const setValue = (evt)=>{
		const {name, value} = evt.target;
		setFormData({
			...formData,
			[name]: value
		})
	};

	const login = useCallback((e)=>{
		e.preventDefault();
		auth.signIn(formData);
	}, [formData]);

	if(auth.user)
	{
		return(
			<Redirect to="/" />
		)
	}

	return(
		<div className={`display_flex display_flex-center text_align_center vh-100`}>
			<form onSubmit={(e)=>login(e)}>
				<h1 className="text text_type_main-medium">Вход</h1>
				<div className='mt-6'>
					<Input
						type={'text'}
						placeholder={'E-mail'}
						onChange={e => setValue(e)}
						value={formData.email}
						name={'email'}
						error={false}
						//ref={inputRef}
						//onIconClick={onIconClick}
						errorText={'Ошибка'}
						size={'default'}
						/>
				</div>
				<div className='mt-6'>
					<PasswordInput onChange={e => setValue(e)} value={formData.password} name={'password'} />
				</div>
				<div className='mt-6'>
					<Button type="primary" size="medium">
						Войти
					</Button>
				</div>
				<div className='mt-20'>
					<span className='text text_type_main-default text_color_inactive'>Вы — новый пользователь? </span>
					<span><NavLink className='text text_type_main-default text_color_inactive nav_link' to="/register">Зарегистрироваться</NavLink></span>
				</div>
				<div className='mt-4'>
					<span className='text text_type_main-default text_color_inactive'>Забыли пароль? </span>
					<span><NavLink className='text text_type_main-default text_color_inactive nav_link' to="/forgot-password">Восстановить пароль</NavLink></span>
				</div>
			</form>
		</div>
	)
}