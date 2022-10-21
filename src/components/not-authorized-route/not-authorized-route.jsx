import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { getUser } from '../../services/actions/user';

export function RouteForUnauthorizedUsers({ children, ...rest }) {
	const dispatch = useDispatch();
	const user = useSelector((state)=>{
		return state.user;
	})

	useEffect(async() => {
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

RouteForUnauthorizedUsers.propTypes = {
	children: PropTypes.node.isRequired,
	...{ path: PropTypes.string.isRequired, exact: PropTypes.bool }
};
