import PropTypes from 'prop-types';

export default function AppError(props) {
    return (
        <h1 className="text text_type_main-small mt-4 text_color_inactive">{props.error}</h1>
    )
};

AppError.propTypes = {
    error: PropTypes.string.isRequired,
};

