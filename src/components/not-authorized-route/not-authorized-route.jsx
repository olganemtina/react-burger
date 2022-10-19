import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import { useProvideAuth } from '../../services/custom-hooks/use-provide-auth';
import PropTypes from 'prop-types';

export function RouteForUnauthorizedUsers({ children, ...rest }) {
	let auth = useProvideAuth();
	const [isUserLoaded, setUserLoaded] = useState(auth.user!==null);

	useEffect(async() => {
		if(!isUserLoaded)
		{
			await auth.getUser();
	  		setUserLoaded(true);
		}
	}, []);

	if(isUserLoaded)
	{
		return (
			<Route
			  {...rest}
			  render={({ location }) =>
				auth.user ? (
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
