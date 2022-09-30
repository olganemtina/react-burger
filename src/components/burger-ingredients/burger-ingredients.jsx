import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ingredientPropTypes from '../../prop-types/ingredient-prop-types';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import style from './burger-ingredients.module.css';
import { setCurrentIngredient } from '../../services/action-creators/current-ingredient';

const getCaption = (type)=>{
    switch(type) {
        case "bun":
            return "Булки"
        case "main":
            return "Начинки"
        case "sauce":
            return "Соусы"
    }
}

export default function BurgerIngredients(props) {
    const [current, setCurrent] = useState('bun');

    const ingredients = useSelector((state)=>{
        return state.ingredients.buns.concat(state.ingredients.items);
    });
    const burgerConstructorIngredients = useSelector((state)=>{
        const ingredientsWithBuns = [...state.burgerConstructorIngredients.items];
        if(state.burgerConstructorIngredients.bun)
        {
            ingredientsWithBuns.push(state.burgerConstructorIngredients.bun);
            ingredientsWithBuns.push(state.burgerConstructorIngredients.bun);
        }
        return ingredientsWithBuns.reduce((acc, item)=>{
            if (acc[item._id])
            {
                acc[item._id]++;
            }
            else
            {
                acc[item._id] = 1;
            }
            return acc;
        }, {});
    });


    const currentIngredient = useSelector((state)=>{
        return state.currentIngredient;
    });


    const dispatch = useDispatch();

    const handleOpenModal = useCallback((ingredient)=>{
        debugger
        dispatch(setCurrentIngredient(ingredient));
    }, [dispatch]);

    const handleCloseModal = useCallback((e)=>{
        dispatch(setCurrentIngredient());
    },[]);

    const groupedIngredients = useMemo(()=>{
        const groupedIngredients = ingredients.reduce((acc, current)=>{
            acc[current.type].push(current);
            return acc;
        }, {'bun': [], 'sauce': [], 'main': []});
        return groupedIngredients;
    }, [ingredients]);

    const handleScroll = useCallback((e)=>{
        const scrollTop = e.target.scrollTop;
        const range = {minHeight: 0, maxHeight: refBun.current.clientHeight};
        Object.keys(groupedIngredients).every((type=>{
            if(range.minHeight <= scrollTop && range.maxHeight >= scrollTop)
            {
                setCurrent(type);
                return false;
            }
            else
            {
                const currentRef = getRef(type);
                range.minHeight += currentRef.current.clientHeight;
                range.maxHeight += currentRef.current.clientHeight;
            }
            return true;
        }))
    },[]);

    const refBun = useRef(null);
    const refMain = useRef(null);
    const refSauce = useRef(null);

    const getRef = (type)=>{
        switch(type) {
            case "bun":
                return refBun;
            case "main":
                return refMain;
            case "sauce":
                return refSauce;
        }
    }

    const goToBlock = (ref, type)=>{
        setCurrent(type);
        ref.current?.scrollIntoView({behavior: 'smooth'});
    }



    return (
        <div>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div className='tabs' style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={()=>goToBlock(refBun, 'bun')} >
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={()=>goToBlock(refSauce, 'sauce')}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={()=>goToBlock(refMain, 'main')}>
                    Начинки
                </Tab>
            </div>
            <div className={style.scroll_container} onScroll={handleScroll}>
                    {
                    Object.entries(groupedIngredients).map(([key, value])=>{
                        return (
                            <div key={key} ref={getRef(key)}>
                                <h2 className='pb-6 pt-10 text text_type_main-medium'>{getCaption(key)}</h2>
                                <div className='display_flex flex-wrap pl-4 pr-4 pb-10'>
                                {value.map((x, i)=>{
                                    return(
                                    <div style={{flex:1}} key={x._id}>
                                        <BurgerIngredient
                                            id = {x._id}
                                            count={burgerConstructorIngredients[x._id] ?? 0}
                                            handleOpenModal={()=>handleOpenModal(x)}
                                            description="20"
                                            imgSrc={x.image}
                                            caption={x.name}
                                        />
                                    </div>)
                                })}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                currentIngredient && <Modal onClose={handleCloseModal} header="Детали ингредиента">
                    <IngredientDetails ingredient = {currentIngredient}/>
                </Modal>
            }
        </div>
    )
}
BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes)
};

