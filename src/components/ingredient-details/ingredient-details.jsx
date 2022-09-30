import ingredientPropTypes from '../../prop-types/ingredient-prop-types';

export default function IngredientDetails(props) {
    return (
        <div className='text_align_center'>
                <img src={props.ingredient.image_large} />
                <div className='text text_type_main-medium mt-4'>{props.ingredient.name}</div>
                <div className='display_flex display_flex-center text text_type_main-default text_color_inactive mt-8'>
                    <div className='pr-5'>Калории, ккал <br/> {props.ingredient.calories}</div>
                    <div className='pr-5'>Белки, г <br/> {props.ingredient.proteins}</div>
                    <div className='pr-5'>Жиры, г <br/> {props.ingredient.fat}</div>
                    <div className='pr-5'>Углеводы, г <br/> {props.ingredient.carbohydrates}</div>
                </div>
        </div>
    )
}

IngredientDetails.propTypes = {
	ingredient: ingredientPropTypes,
}

