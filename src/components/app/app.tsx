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
import { HomePage } from "../../pages/home/home";
import { getIngredients } from "../../services/action-types/burger-ingredients";
import { useAppDispatch } from "../../services/hooks/use-app-dispatch";
import { useAppSelector } from "../../services/hooks/use-app-selector";
import { PageUrls } from "../../utils/enums/pages";
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
	const location = useLocation();
	const history = useHistory();

	//@ts-ignore
	const background = location.state && location.state.background;

	const onClose = useCallback((from: string) => {
		history.replace({ pathname: from });
	}, []);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	return (
		<div className={`${style.App}`}>
			<AppHeader />
			<Switch location={background || location}>
				<Route path={`${PageUrls.home}`} exact>
					<HomePage />
				</Route>
				<Route path={`${PageUrls.feed}`} exact>
					<FeedPage />
				</Route>
				<Route path={`${PageUrls.feed}/:id`} exact>
					<FeedDetailsPage />
				</Route>
				<RouteForUnauthorizedUsers path={`${PageUrls.login}`} exact>
					<LoginPage />
				</RouteForUnauthorizedUsers>
				<RouteForUnauthorizedUsers
					path={`${PageUrls.register}`}
					exact
				>
					<RegisterPage />
				</RouteForUnauthorizedUsers>
				<RouteForUnauthorizedUsers
					path={`${PageUrls.forgotPassword}`}
					exact
				>
					<ForgotPasswordPage />
				</RouteForUnauthorizedUsers>
				<RouteForUnauthorizedUsers
					path={`${PageUrls.resetPassword}`}
					exact
				>
					<ResetPasswordPage />
				</RouteForUnauthorizedUsers>
				<ProtectedRoute path={`${PageUrls.profile}`} exact>
					<ProfileContainerPage>
						<ProfilePage />
					</ProfileContainerPage>
				</ProtectedRoute>
				<ProtectedRoute path={`${PageUrls.profileOrders}`} exact>
					<ProfileContainerPage>
						<ProfileOrdersPage />
					</ProfileContainerPage>
				</ProtectedRoute>
				<ProtectedRoute
					path={`${PageUrls.profileOrders}/:id`}
					exact
				>
					<FeedDetailsPage />
				</ProtectedRoute>
				<Route path={`${PageUrls.ingredients}/:id`} exact>
					<IngredientDetails />
				</Route>
			</Switch>

			{background && (
				<Switch>
					<Route path={`${PageUrls.ingredients}/:id`}>
						<Modal
							onClose={() => onClose(PageUrls.home)}
							header="Детали ингредиента"
						>
							<IngredientDetails />
						</Modal>
					</Route>
					<Route path={`${PageUrls.profileOrders}/:id`}>
						<Modal
							onClose={() =>
								onClose(PageUrls.profileOrders)
							}
						>
							<FeedDetails />
						</Modal>
					</Route>
					<Route path="/feed/:id">
						<Modal onClose={() => onClose(PageUrls.feed)}>
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
