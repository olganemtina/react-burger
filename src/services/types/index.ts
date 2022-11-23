import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TBurgerConstructorIngredientsAction } from "../action-creators/burger-constructor-ingredients";
import { TBurgerIngredientsAction } from "../action-creators/burger-ingredients";
import { TCurrentIngredientAction } from "../action-creators/current-ingredient";
import { TWsFeedAction } from "../action-creators/feed";
import { TOrderAction } from "../action-creators/order";
import { TUserAction } from "../action-creators/user";
import store from '../store';

export type TApplicationActions = TBurgerConstructorIngredientsAction | TBurgerIngredientsAction | TCurrentIngredientAction | TOrderAction | TUserAction | TWsFeedAction
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
