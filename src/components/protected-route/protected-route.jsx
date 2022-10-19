import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import { useProvideAuth } from '../../services/custom-hooks/use-provide-auth';
import PropTypes from 'prop-types';

export function ProtectedRoute({ children, ...rest }) {
	let auth = useProvideAuth();
	const [isUserLoaded, setUserLoaded] = useState(false);

	const init = async () => {
	  await auth.getUser();
	  setUserLoaded(true);
	};

	useEffect(() => {
	  init();
	}, []);

	if(isUserLoaded)
	{
		return (
			<Route
			  {...rest}
			  render={({ location }) =>
				auth.user ? (
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