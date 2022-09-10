import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ingredientPropTypes from '../../prop-types/ingredient-prop-types';
import PropTypes from 'prop-types';

export default function BurgerConstructor(props) {
	const [state, setState] = useState({
        visible: false
    });

	const scrollContainer = useRef(null);


	useEffect(()=>{
        const headerH = document.getElementsByTagName("header")[0].offsetHeight;
        const h1H= document.getElementsByTagName("h1")[0].offsetHeight;
        const tabsH = document.getElementsByClassName("tabs")[0].offsetHeight;
		const totalPriceContainerH = document.getElementsByClassName("total_price_container")[0].offsetHeight;
        const bottomH = 100;
        const heightH = window.innerHeight - headerH - h1H - tabsH - totalPriceContainerH - bottomH;
        scrollContainer.current.setAttribute("style","height:"+heightH+"px; overflow: auto");
    },[])

	let handleOpenModal = useCallback(()=>{
        setState({
            visible:true
        });
    }, []);

	let handleCloseModal = useCallback((e)=>{
        if(e.target === e.currentTarget || e.target.closest(".close-button") || e.code === "Escape")
        {
            setState({
                visible:false
            });
        }
    },[]);

	let totalPrice = useMemo(()=>{
		return props.ingredients.reduce((sum, current)=>{
			return sum + current.price;
		}, 0)
	}, [props.ingredients])



	return (
		<div>
			<div ref={scrollContainer}>
				{props.ingredients.map((x, i)=>{
					return (
						<div key={x._id} className='mt-4 mb-4' style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
							{(i !== 0 && i !== props.ingredients.length-1) && <DragIcon type="primary" />}
							{(i === 0 || i === props.ingredients.length-1) && <span className='mr-6'></span>}
							<ConstructorElement
							type={i==0 ? "top" : (i==props.ingredients.length-1 ? "bottom": undefined)}
							text={x.name}
							price={x.price}
							thumbnail={x.image_mobile}
							/>
						</div>
					)
				})}
			</div>
			<div className='mt-10 text-align-right total_price_container'>
				<span className='inline-flex mr-10 text text_type_digits-medium'>
					{totalPrice}
					<span className='pl-2'>
						<CurrencyIcon type="primary" />
					</span>
				</span>
				<Button onClick={handleOpenModal} type="primary" size="large">
					Оформить заказ
				</Button>
			</div>
			{
				state.visible && 
				<Modal header="" onClose={handleCloseModal} >
					<OrderDetails />
				</Modal> 
			}
		</div>
	)
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes)
};

