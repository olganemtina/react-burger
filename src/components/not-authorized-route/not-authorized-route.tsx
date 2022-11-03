import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { IRouterParams, TRouteForUnauthorizedUsers } from '../../models/routing';
import { getUser } from '../../services/actions/user';

export const RouteForUnauthorizedUsers: FC<TRouteForUnauthorizedUsers<IRouterParams>> = ({ children, ...rest })=> {
	const dispatch = useDispatch();
	const user = useSelector((state)=>{
		// @ts-ignore
		return state.user;
	})

	useEffect(() => {
		if(!user.loaded)
		{
			dispatch(getUser());
		}
	}, []);

	if(user.loaded)
	{
		return (
			<Route
			  {...rest}
			  render={({ location }) =>
				user.data ? (
					<Redirect
					to={{
					  pathname: '/',
					  state: { from: location }
					}}
				  />

				) : children

			  }
			/>
		  );
	}
	else {
		return null;
	}
  }
