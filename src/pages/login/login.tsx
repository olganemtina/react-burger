import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { signIn } from '../../services/actions/user';
import {AppError} from '../../components/app-error/app-error'
import { ILoginFormData } from '../../models/auth';

export const LoginPage = () => {
	const dispatch = useDispatch();

	const user = useSelector((state)=>{
		//@ts-ignore
		return state.user;
	})

	const [formData, setFormData] = useState<ILoginFormData>({
		email: "",
		password: ""
	});

	const [formSended, setFormSended] = useState(false);

	const setValue = (evt: SyntheticEvent<HTMLInputElement>)=>{
		const {name, value} = evt.target as HTMLInputElement;
		setFormData({
			...formData,
			[name]: value
		})
	};

	const login = useCallback(async(e: SyntheticEvent<HTMLFormElement>)=>{
		e.preventDefault();
		dispatch(signIn(formData));
		setFormSended(true);
	}, [formData]);

	if(!user.loaded)
	{
		return(
			<Redirect to="/" />
		)
	}

	return(
		<div className={`display_flex display_flex-center text_align_center vh-100`}>
			<form onSubmit={(e)=>login(e)}>
				<h1 className="text text_type_main-medium">Вход</h1>
				{formSended && user.error && <AppError error={user.error}/>}
				<div className='mt-6'>
					<Input
						type={'text'}
						placeholder={'E-mail'}
						onChange={e => setValue(e)}
						value={formData.email}
						name={'email'}
						error={false}
						errorText={'E-mail invalid'}
						size={'default'}
						/>
				</div>
				<div className='mt-6'>
					<PasswordInput onChange={e => setValue(e)} value={formData.password} name={'password'} />
				</div>
				<div className='mt-6'>
					<Button htmlType="submit" type="primary" size="medium">
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