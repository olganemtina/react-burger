import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ingredientPropTypes from '../../prop-types/ingredient-prop-types';
import { getIngredients } from '../../services/actions';
import AppError from '../app-error/app-error';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import './App.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const useAppDispatch: () => any = useDispatch

function App() {
  const {ingredientsRequestFailed, error} = useSelector((state: any)=>{
    return state.ingredients
  });


  const dispatch = useAppDispatch();


  const AppBody = () => {
    return (
    <main className='display_flex'>
      <DndProvider backend={HTML5Backend}>
        <div style={{ width: '50%' }}>
          <BurgerIngredients />
        </div>
        <div className='mt-25 ml-10'>
          <BurgerConstructor />
        </div>
      </DndProvider>
    </main>);
  }

  useEffect(()=>{
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader/>
          {ingredientsRequestFailed
              ? <AppError error={error}/>
              : <AppBody />
            }
    </div>
  );
}

export default App;
