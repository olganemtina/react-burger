import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { getUser } from '../../services/actions/user';

export function ProtectedRoute({ children, ...rest }) {
	const dispatch = useDispatch();

	const user = useSelector((state)=>{
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

  ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
	...{ path: PropTypes.string.isRequired, exact: PropTypes.bool }
};