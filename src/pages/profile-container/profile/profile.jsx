import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useProvideAuth } from '../../../services/custom-hooks/use-provide-auth';

export default function ProfilePage(){
	const auth = useProvideAuth();

	const [inputsDisabled, setInputDisabled] = useState({
		name: true,
		email: true,
		password: true
	});

	const [formChanged, setFormChanged] = useState(false);

	const inputNameRef = useRef(null);
	const inputEmailRef = useRef(null);
	const inputPasswordRef = useRef(null);

	const [formData, setFormData] = useState({name: "", email: "", password: ""});

	useEffect(()=>{

		setFormData({...auth.user, password: ""});
	}, [auth.user]);


	const setValue = (target) =>{
		const {name, value} = target;
		setFormData({
			...formData,
			[name]: value
		});
		setFormChanged(true);

	}
	const onIconClick = (inputName)=>{
		let newState = Object.entries(inputsDisabled).reduce((newObj, item)=>{
			newObj[item[0]] = true;
			return newObj;
		}, {});
		newState[inputName] = false
		setInputDisabled(newState);
	}

	useEffect(()=>{
		if(!inputsDisabled.name)
		{
			inputNameRef.current.focus();
		}
		if(!inputsDisabled.email)
		{
			inputEmailRef.current.focus();
		}
		if(!inputsDisabled.password)
		{
			inputPasswordRef.current.focus();
		}
	}, [inputsDisabled]);

	const saveHandler = useCallback(async()=>{
		await auth.updateUser(formData);

	}, [formData]);

	const cancelHandler = useCallback(()=>{
		setFormData({...auth.user, password: ""});
		setFormChanged(false);
	}, []);

	return(
		<div>
			<div className='mb-6'>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={e => setValue(e.target)}
					icon={'EditIcon'}
					value={formData.name}
					name={'name'}
					error={false}
					ref={inputNameRef}
					disabled={inputsDisabled.name}
					onIconClick={(e)=>onIconClick("name")}
					errorText={'Ошибка'}
					size={'default'}
					/>
			</div>
			<div className='mb-6'>
				<Input
					type={'text'}
					placeholder={'Логин'}
					onChange={e => setValue(e.target)}
					icon={'EditIcon'}
					value={formData.email}
					name={'email'}
					error={false}
					ref={inputEmailRef}
					disabled={inputsDisabled.email}
					onIconClick={(e)=>onIconClick("email")}
					errorText={'Ошибка'}
					size={'default'}
					/>
			</div>
			<div className='mb-6'>
				<Input
					type={'password'}
					placeholder={'Пароль'}
					onChange={e => setValue(e.target)}
					icon={'EditIcon'}
					value={formData.password}
					name={'password'}
					error={false}
					ref={inputPasswordRef}
					disabled={inputsDisabled.password}
					onIconClick={(e)=>onIconClick("password")}
					errorText={'Ошибка'}
					size={'default'}
					/>
			</div>
			<div>
				{
					formChanged &&
					<div>
						<Button className="mr-5" type="primary" size="medium" onClick={saveHandler}>
							Сохранить
						</Button>
						<Button onClick={cancelHandler} type="secondary" size="medium">Отмена</Button>
					</div>
				}
			</div>


		</div>
	)
}