import { FC } from 'react';

export const AppError:FC<{error: string}> = ({error}) => {
    return (
        <h1 className="text text_type_main-small mt-4 text_color_inactive">{error}</h1>
    )
};

