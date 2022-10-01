import PropTypes from 'prop-types';

export default function AppLoad(props){
	return (
		<div>
			{props.text}
		</div>
	)
}

AppLoad.propTypes = {
	text: PropTypes.string.isRequired
}