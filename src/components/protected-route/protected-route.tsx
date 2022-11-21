import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route } from "react-router";
import {
	IRouterParams,
	TRouteForUnauthorizedUsers,
} from "../../services/types/routing";
import { getUser } from "../../services/action-types/user";
import { useSelector } from "../../utils/hooks";

export const ProtectedRoute: FC<TRouteForUnauthorizedUsers<IRouterParams>> = ({
	children,
	...rest
}) => {
	const dispatch = useDispatch();

	const user = useSelector((state) => {
		return state.user;
	});

	useEffect(() => {
		dispatch(getUser());
	}, []);

	if (user.loaded) {
		return (
			<Route
				{...rest}
				render={({ location }) =>
					user.data ? (
						children
					) : (
						<Redirect
							to={{
								pathname: "/login",
								state: { from: location },
							}}
						/>
					)
				}
			/>
		);
	} else {
		return <div>Загрузка данных...</div>;
	}
};
