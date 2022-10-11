import PropTypes from 'prop-types';

export default function AppError(props) {
    return (
        <div>
			{props.error}
		</div>
    )
};

AppError.propTypes = {
    error: PropTypes.string.isRequired,
};

