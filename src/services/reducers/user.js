import { SET_USER } from "../actions/user";

const initialUserState = null;

export default function userReducer(state = initialUserState, action) {
	switch (action.type) {
		case SET_USER: {
			return action.user
				? {
						...state,
						...action.user,
				  }
				: null;
		}
		default:
			return state;
	}
}
