import { useCallback, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	useHistory,
	useLocation,
} from "react-router-dom";
import {
	ForgotPasswordPage,
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
import { FeedDetails } from "../feed-details/feed-details";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../modal/modal";
import { RouteForUnauthorizedUsers } from "../not-authorized-route/not-authorized-route";
import { ProtectedRoute } from "../protected-route/protected-route";
import style from "./app.module.scss";

function ModalSwitch() {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	const { ingredientsRequestFailed, ingredientsRequest, error } =
		useAppSelector((state) => {
			return state.ingredients;
		});

	//@ts-ignore
	const background = location.state && location.state.background;

	const onClose = useCallback((from: string) => {
		history.replace({ pathname: from });
	}, []);

	return (
		<div className={`${style.App}`}>
			<AppHeader />
			<Switch location={background || location}>
				<Route path="/" exact>
					{ingredientsRequestFailed ? (
						<AppError error={error} />
					) : ingredientsRequest ? (
						<AppLoad text="Идет загрузка данных..." />
					) : (
						<AppBody />
					)}
				</Route>
				<Route path="/feed" exact>
					<FeedPage />
				</Route>
				<Route path="/feed/:id" exact>
					<FeedDetailsPage />
				</Route>
				<RouteForUnauthorizedUsers path="/login" exact>
					<LoginPage />
				</RouteForUnauthorizedUsers>
				<RouteForUnauthorizedUsers path="/register" exact>
					<RegisterPage />
				</RouteForUnauthorizedUsers>
				<RouteForUnauthorizedUsers path="/forgot-password" exact>
					<ForgotPasswordPage />
				</RouteForUnauthorizedUsers>
				<RouteForUnauthorizedUsers path="/reset-password" exact>
					<ResetPasswordPage />
				</RouteForUnauthorizedUsers>
				<ProtectedRoute path={"/profile"} exact>
					<ProfileContainerPage>
						<ProfilePage />
					</ProfileContainerPage>
				</ProtectedRoute>
				<ProtectedRoute path={"/profile/orders"} exact>
					<ProfileContainerPage>
						<ProfileOrdersPage />
					</ProfileContainerPage>
				</ProtectedRoute>
				<ProtectedRoute path={"/profile/orders/:id"} exact>
					<FeedDetailsPage />
				</ProtectedRoute>
				<Route path="/ingredients/:id" exact>
					<IngredientDetails />
				</Route>
			</Switch>

			{background && (
				<Switch>
					<Route path="/ingredients/:id">
						<Modal
							onClose={() => onClose("/")}
							header="Детали ингредиента"
						>
							<IngredientDetails />
						</Modal>
					</Route>
					<Route path="/profile/orders/:id">
						<Modal onClose={() => onClose("/profile/orders")}>
							<FeedDetails />
						</Modal>
					</Route>
					<Route path="/feed/:id">
						<Modal onClose={() => onClose("/feed")}>
							<FeedDetails />
						</Modal>
					</Route>
				</Switch>
			)}
		</div>
	);
}

function App() {
	return (
		<Router>
			<ModalSwitch />
		</Router>
	);
}

export default App;
