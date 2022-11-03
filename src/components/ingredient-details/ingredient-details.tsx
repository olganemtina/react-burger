import { FC } from 'react';
import { IIngredientDetails } from '../../models/ingredient';

export const IngredientDetails: FC<IIngredientDetails> = ({image_large, name, calories, proteins, fat, carbohydrates}) => {
    return (
        <div className='text_align_center'>
                <img src={image_large} />
                <div className='text text_type_main-medium mt-4'>{name}</div>
                <div className='display_flex display_flex-center text text_type_main-default text_color_inactive mt-8'>
                    <div className='pr-5'>Калории, ккал <br/> {calories}</div>
                    <div className='pr-5'>Белки, г <br/> {proteins}</div>
                    <div className='pr-5'>Жиры, г <br/> {fat}</div>
                    <div className='pr-5'>Углеводы, г <br/> {carbohydrates}</div>
                </div>
        </div>
    )
}
