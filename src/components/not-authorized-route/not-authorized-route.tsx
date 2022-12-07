import { FC, useEffect } from "react";
import { Redirect, Route } from "react-router";
import {
	IRouterParams,
	TRouteForUnauthorizedUsers,
} from "../../services/types/routing";
import { getUser } from "../../services/action-types/user";
import { useAppDispatch } from "../../services/hooks/use-app-dispatch";
import { useAppSelector } from "../../services/hooks/use-app-selector";

export const RouteForUnauthorizedUsers: FC<
	TRouteForUnauthorizedUsers<IRouterParams>
> = ({ children, ...rest }) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => {
		return state.user;
	});

	useEffect(() => {
		if (!user.loaded) {
			dispatch(getUser());
		}
	}, []);

	if (user.loaded) {
		return (
			<Route
				{...rest}
				render={({ location }) =>
					user.data ? (
						<Redirect
							to={{
								pathname: "/",
								state: { from: location },
							}}
						/>
					) : (
						children
					)
				}
			/>
		);
	} else {
		return null;
	}
};
