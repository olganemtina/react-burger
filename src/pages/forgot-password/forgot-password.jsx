import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useProvideAuth } from '../../services/custom-hooks/use-provide-auth';

export default function ForgotPasswordPage() {
	const auth = useProvideAuth();
	const history = useHistory();

	const [email, setEmail] = useState("");
	const [errorMsg, setErrorMsg] = useState(null);
	const restoreHandler = useCallback(async(e)=>{
		e.preventDefault();
		const result = await auth.passwordResetStep1({
			"email": email
		});
		if(result.success)
		{
			history.replace({pathname: "/reset-password", state:{from: "/forgot-password"}});
		}
		else
		{
			setErrorMsg(result.message);
		}
	}, [email]);
	return(
		<div className={`display_flex display_flex-center text_align_center vh-100`}>
			<form onSubmit={(e)=>restoreHandler(e)}>
				<h1 className="text text_type_main-medium">Восстановление пароля</h1>
				<div className='mt-6'>
					<Input
						type={'text'}
						placeholder={'Укажите e-mail'}
						onChange={e => setEmail(e.target.value)}
						value={email}
						name={'e-mail'}
						error={false}
						size={'default'}
						/>
				</div>
				<div className='mt-6'>
					<Button type="primary" size="medium">
						Восстановить
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