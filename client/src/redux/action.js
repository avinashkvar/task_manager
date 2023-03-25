export const ADD_SPRINTS = 'ADD_SPRINTS';
export const ADD_USERS = 'ADD_USERS';
export const ADD_USER = 'ADD_USER'

export const createSprints = (value) => {
	return {
		type: ADD_SPRINTS,
		payload: value,
	};
};

export const createUser = (value)=>{
     return {
        type:ADD_USER,
        payload:value
     }
}

export const createUsers = (value) => {
	return {
		type: ADD_USERS,
		payload: value,
	};
};

export const getSprints = () => async (dispatch) => {
	const data = await fetch('http://localhost:3001/sprints').then((res) =>
		res.json(),
	);
    console.log('data',data)
	dispatch(createSprints(data));
	return data;
};

export const getUsers = () => async (dispatch) => {
	const data = await fetch('http://localhost:3001/users').then((res) => res.json());
	dispatch(createUsers(data));
	return data;
};

export const postTask = (value,id)=>async(dispatch)=>{
    const data = await fetch(`http://localhost:3001/tasks/${id}`,{
        method:'POST',
        headers:{
            'Content-type':"application/json"
        },
        body:JSON.stringify(value)
    }).then(res=>res.json())
    return data
}