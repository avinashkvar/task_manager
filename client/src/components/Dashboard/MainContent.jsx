import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSprints } from '../../redux/action';
import Sprint from './Sprint';

const MainContent = () => {
	const dispatch = useDispatch();
    const spirnts = useSelector((store)=>store.sprints)
	useEffect(() => {
		dispatch(getSprints()).then((res) => console.log(res));
	}, [dispatch]);
	return <div>{
        spirnts.map((e,i)=><Sprint key={i} tasks={e.tasks} id={e._id}/>)
    }</div>;
};

export default MainContent;
