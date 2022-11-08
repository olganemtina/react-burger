import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { useAppDispatch } from '../../utils/helpers';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfileContainerPage, IngredientPage, ProfileOrdersPage, ProfilePage } from '../../pages';
import {AppError} from '../app-error/app-error';
import AppHeader from '../app-header/app-header';
import {AppLoad} from '../app-load/app-load';
import {BurgerConstructor} from '../burger-constructor/burger-constructor';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients';
import {ProtectedRoute} from '../protected-route/protected-route';
import {RouteForUnauthorizedUsers} from '../not-authorized-route/not-authorized-route'
import './app.css';



function App() {
  const {ingredientsRequestFailed, ingredientsRequest, error} = useSelector((state: any)=>{
    return state.ingredients
  });


  const dispatch = useAppDispatch();


  const AppBody = () => {
    return (
      <main className='display_flex'>
        <DndProvider backend={HTML5Backend}>
          <div className='width_50_percent'>
            <BurgerIngredients />
          </div>
          <div className='mt-25 ml-10'>
            <BurgerConstructor />
          </div>
        </DndProvider>
      </main>
    );
  }

  useEffect(()=>{
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact={true}>
              <AppHeader/>
                  {ingredientsRequestFailed
                      ? <AppError error={error}/>
                      : (
                        ingredientsRequest
                          ? <AppLoad text='Идет загрузка данных...'/> 
                          : <AppBody />
                      )
                    }
          </Route>
          <RouteForUnauthorizedUsers path="/login" exact={true}>
            <LoginPage />
          </RouteForUnauthorizedUsers>
          <RouteForUnauthorizedUsers path="/register" exact={true}>
            <RegisterPage />
          </RouteForUnauthorizedUsers>
          <RouteForUnauthorizedUsers path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </RouteForUnauthorizedUsers>
          <RouteForUnauthorizedUsers path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </RouteForUnauthorizedUsers>
          <ProtectedRoute path={'/profile'} exact={true}>
            <AppHeader/>
            <ProfileContainerPage>
              <ProfilePage />
            </ProfileContainerPage>
          </ProtectedRoute>
          <ProtectedRoute path={'/profile/orders'} exact={true}>
            <AppHeader/>
            <ProfileContainerPage>
              <ProfileOrdersPage />
            </ProfileContainerPage>
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact={true}>
            <AppHeader/>
            <IngredientPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
