export const ADD_SPRINTS = 'ADD_SPRINTS';

export const createSprints = (value)=>{
     return {
         type:ADD_SPRINTS,
         payload:value
     }
}


export const getSprints = ()=>async(dispatch)=>{
    const data = fetch('http://localhost:3001/sprints').then(res => res.json())
    dispatch(createSprints(data))
    return data
}