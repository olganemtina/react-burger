import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { IRouterParams, TRouteForUnauthorizedUsers } from '../../models/routing';
import { getUser } from '../../services/actions/user';

export const ProtectedRoute: FC<TRouteForUnauthorizedUsers<IRouterParams>> = ({ children, ...rest }) => {
	const dispatch = useDispatch();

	const user = useSelector((state)=>{
		//@ts-ignore
		return state.user;
	})

	useEffect(() => {
		dispatch(getUser());
	}, []);

	if(user.loaded)
	{
		return (
			<Route
			  {...rest}
			  render={({ location }) =>
				user.data ? (
				  children
				) : (
				  <Redirect
					to={{
					  pathname: '/login',
					  state: { from: location }
					}}
				  />
				)
			  }
			/>
		  );
	}
	else {
		return <div>Загрузка данных...</div>;
	}
  }
