import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import ingredientPropTypes from '../../prop-types/ingredient-prop-types';
import PropTypes from 'prop-types';

let getCaption = (type)=>{
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
    const [state, setState] = useState({
        visible: false
    })

    const [detailedIngredient, setDetailedIngredient] = useState({});

    const scrollContainer = useRef(null);

    useEffect(()=>{
        const headerH = document.getElementsByTagName("header")[0].offsetHeight;
        const h1H= document.getElementsByTagName("h1")[0].offsetHeight;
        const tabsH = document.getElementsByClassName("tabs")[0].offsetHeight;
        const bottomH = 100;
        const heightH = window.innerHeight - headerH - h1H - tabsH - bottomH;
        scrollContainer.current.setAttribute("style","height:"+heightH+"px; overflow: auto");
    },[])

    const handleOpenModal = useCallback((ingredient)=>{
        setState({
            visible:true
        });
        setDetailedIngredient({
            ...ingredient
        });
    }, [])

    const handleCloseModal = useCallback((e)=>{
        if(e.target === e.currentTarget || e.target.closest(".close-button") || e.code === "Escape")
        {
            setState({
                visible:false
            });
            setDetailedIngredient({});
        }
    },[])


    const groupedIngredients = useMemo(()=>{
        return props.ingredients.reduce((acc, current)=>{
            if(acc[current.type])
            {
                acc[current.type].push(current);
            }
            else
            {
                acc[current.type] = [current];
            }
            return acc;
        }, []);
    }, [props.ingredients]);


    return (
        <div>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div className='tabs' style={{ display: 'flex' }}>
                <Tab value="1"  >
                    Булки
                </Tab>
                <Tab value="2"  >
                    Соусы
                </Tab>
                <Tab value="3"  >
                    Начинки
                </Tab>
            </div>
            <div ref={scrollContainer}>
                {
                    Object.entries(groupedIngredients).map(([key, value])=>{
                        return (
                            <div key={key}>
                                <h2 className='pb-6 pt-10 text text_type_main-medium'>{getCaption(key)}</h2>
                                <div className='display_flex flex-wrap pl-4 pr-4 pb-10'>
                                {value.map((x, i)=>{
                                    return(
                                    <div style={{flex:1}} key={x._id}>
                                        <BurgerIngredient 
                                            count={i == 0 ? 1 : 0}
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
                state.visible && detailedIngredient && <Modal onClose={handleCloseModal} header="Детали ингредиента">
                    <IngredientDetails ingredient = {detailedIngredient}/>
                </Modal>
            }
        </div>
    )
}
BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes)
};

