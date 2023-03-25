import { ADD_SPRINTS, ADD_USER, ADD_USERS } from './action';
const init = { sprints: [], users: [], user: {} };

export const reducer = (store = init, { type, payload }) => {
	switch (type) {
		case ADD_SPRINTS:
			return { ...store, sprints: payload };
		case ADD_USERS:
			return { ...store, users: payload };
		case ADD_USER:
			return { ...store, user: payload };
		default:
			return store;
	}
};
