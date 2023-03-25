import { ADD_SPRINTS } from './action';
const init = { spritns: [] };

export const reducer = (store = init, { type, payload }) => {
	switch (type) {
		case ADD_SPRINTS:
			return { ...store, sprints: payload };
		default:
			return store;
	}
};
