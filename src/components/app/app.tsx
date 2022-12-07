import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
	ForgotPasswordPage,
	IngredientPage,
	LoginPage,
	ProfileContainerPage,
	ProfileOrdersPage,
	ProfilePage,
	RegisterPage,
	ResetPasswordPage,
} from "../../pages";
import { FeedPage } from "../../pages/feed/feed";
import { FeedDetailsPage } from "../../pages/feed/feed-details/feed-details";
import { getIngredients } from "../../services/action-types/burger-ingredients";
import { useAppDispatch } from "../../services/hooks/use-app-dispatch";
import { useAppSelector } from "../../services/hooks/use-app-selector";
import { AppBody } from "../app-body/app-body";
import { AppError } from "../app-error/app-error";
import AppHeader from "../app-header/app-header";
import { AppLoad } from "../app-load/app-load";
import { RouteForUnauthorizedUsers } from "../not-authorized-route/not-authorized-route";
import { ProtectedRoute } from "../protected-route/protected-route";
import style from "./app.module.scss";

function App() {
	const { ingredientsRequestFailed, ingredientsRequest, error } =
		useAppSelector((state) => {
			return state.ingredients;
		});

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	return (
		<div className={style.App}>
			<Router>
				<Switch>
					<Route path="/" exact>
						<AppHeader />
						{ingredientsRequestFailed ? (
							<AppError error={error} />
						) : ingredientsRequest ? (
							<AppLoad text="Идет загрузка данных..." />
						) : (
							<AppBody />
						)}
					</Route>
					<Route path="/feed" exact>
						<AppHeader />
						<FeedPage />
					</Route>
					<Route path="/feed/:id" exact>
						<AppHeader />
						<FeedDetailsPage />
					</Route>
					<RouteForUnauthorizedUsers path="/login" exact>
						<LoginPage />
					</RouteForUnauthorizedUsers>
					<RouteForUnauthorizedUsers path="/register" exact>
						<RegisterPage />
					</RouteForUnauthorizedUsers>
					<RouteForUnauthorizedUsers
						path="/forgot-password"
						exact
					>
						<ForgotPasswordPage />
					</RouteForUnauthorizedUsers>
					<RouteForUnauthorizedUsers
						path="/reset-password"
						exact
					>
						<ResetPasswordPage />
					</RouteForUnauthorizedUsers>
					<ProtectedRoute path={"/profile"} exact>
						<AppHeader />
						<ProfileContainerPage>
							<ProfilePage />
						</ProfileContainerPage>
					</ProtectedRoute>
					<ProtectedRoute path={"/profile/orders"} exact>
						<AppHeader />
						<ProfileContainerPage>
							<ProfileOrdersPage />
						</ProfileContainerPage>
					</ProtectedRoute>
					<ProtectedRoute path={"/profile/orders/:id"} exact>
						<AppHeader />
						<FeedDetailsPage />
					</ProtectedRoute>
					<Route path="/ingredients/:id" exact>
						<AppHeader />
						<IngredientPage />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
