import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { updateUser } from '../../../services/actions/user'


export default function ProfilePage(){
	const user = useSelector((state)=>{
		return state.user;
	});

	const dispatch = useDispatch();

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
		setFormData({...user.data, password: ""});
	}, [user.data]);


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
		dispatch(updateUser(formData));
		setFormChanged(false);
	}, [formData]);

	const cancelHandler = useCallback(()=>{
		setFormData({...user.data, password: ""});
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
						<Button htmlType="submit" className="mr-5" type="primary" size="medium" onClick={saveHandler}>
							Сохранить
						</Button>
						<Button onClick={cancelHandler} type="secondary" size="medium">Отмена</Button>
					</div>
				}
			</div>


		</div>
	)
}