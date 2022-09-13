import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useRef, useState } from 'react';
import ingredientPropTypes from '../../prop-types/ingredient-prop-types';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import style from './burger-ingredients.module.css';

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
    const [state, setState] = useState({
        visible: false
    })

    const [detailedIngredient, setDetailedIngredient] = useState({});


    const handleOpenModal = useCallback((ingredient)=>{
        setState({
            visible:true
        });
        setDetailedIngredient({
            ...ingredient
        });
    }, [])

    const handleCloseModal = useCallback((e)=>{
        setState({
            visible:false
        });
        setDetailedIngredient({});
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

    const goToBlock = (ref)=>{
        ref.current?.scrollIntoView({behavior: 'smooth'});
    }



    return (
        <div>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div className='tabs' style={{ display: 'flex' }}>
                <Tab value="bun" onClick={()=>goToBlock(refBun)} >
                    Булки
                </Tab>
                <Tab value="sauce" onClick={()=>goToBlock(refSauce)}>
                    Соусы
                </Tab>
                <Tab value="main" onClick={()=>goToBlock(refMain)}>
                    Начинки
                </Tab>
            </div>
            <div className={style.scroll_container}>

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

