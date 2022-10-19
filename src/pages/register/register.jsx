import { Input, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Redirect } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useProvideAuth } from '../../services/custom-hooks/use-provide-auth';

export default function RegisterPage() {
	let auth = useProvideAuth();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: ""
	});

	const registerClickHandler = useCallback((e)=>{
		e.preventDefault();
		auth.signUp(formData);
	}, [formData]);

	const setValue = (e) =>{
		const {name, value} = e.target;
		setFormData({
			...formData,
			[name]: value
		})
	}

	if(auth.user)
	{
		return(
			<Redirect to="/" />
		)
	}

	return(
		<div className={`display_flex display_flex-center text_align_center vh-100`}>
			<form onSubmit={(e)=>registerClickHandler(e)}>
				<h1 className="text text_type_main-medium">Регистрация</h1>
				<div className='mt-6'>
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={e => setValue(e)}
						value={formData.name}
						name={'name'}
						size={'default'}
						/>
				</div>
				<div className='mt-6'>
					<Input
						type={'text'}
						placeholder={'E-mail'}
						onChange={e => setValue(e)}
						value={formData.email}
						name={'email'}
						size={'default'}
						/>
				</div>
				<div className='mt-6'>
					<PasswordInput onChange={e => setValue(e)} value={formData.password} name={'password'} />
				</div>
				<div className='mt-6'>
					<Button type="primary" size="medium">
						Зарегистрироваться
					</Button>
				</div>
				<div className='mt-20'>
					<span className='text text_type_main-default text_color_inactive'>Уже зарегистрированы? </span>
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