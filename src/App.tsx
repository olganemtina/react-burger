import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import './App.css';

const getIngredientsUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [state, setState] = useState({
    ingredients: []
  });
  const [err, setError] = useState();

  useEffect(()=>{
    const getData = async () =>{
      const result = await fetch(getIngredientsUrl);
      const response = await result.json();
      if(response.success)
      {
        setState({
          ...state,
          ingredients: response.data
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
     <main className='display_flex'>
      <div style={{width: '50%'}}>
        <BurgerIngredients ingredients={state.ingredients}/>
      </div>
      <div className='mt-25 ml-10'>
        <BurgerConstructor ingredients={state.ingredients}/>
      </div>
     </main>
    </div>
  );
}

export default App;
