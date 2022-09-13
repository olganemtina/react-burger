import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ingredientPropTypes from '../../prop-types/ingredient-prop-types';
import { getIngredientsUrl } from '../../utils/burger-api';
import AppError from '../app-error/app-error';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import './App.css';

function App() {
  const [state, setState] = useState({
    ingredients: [],
    buns:[]
  });

  const [error, setError] = useState();

  const AppBody = () => {
    return <main className='display_flex'><div style={{ width: '50%' }}>
      <BurgerIngredients ingredients={state.ingredients}/>
    </div>
      <div className='mt-25 ml-10'>
        <BurgerConstructor ingredients={state.ingredients} />
      </div>
    </main>;
  }

  useEffect(()=>{
    const getData = async () =>{
      const result = await fetch(getIngredientsUrl);
      const response = await result.json();
      if(response.success)
      {
        setState({
          ...state,
          ingredients: response.data,
        })
      }
    }
    try{
      getData();
    }
    catch(err: any)
    {
      setError(err);
    }
  }, []);

  return (
    <div className="App">
      <AppHeader/>
          {error
              ? <AppError error={error}/>
              : <AppBody />
            }
    </div>
  );
}

App.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
};

export default App;
