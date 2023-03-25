import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSprints } from '../../redux/action';
import Loader from '../Loader/Loader';
import Sprint from './Sprint';

const MainContent = () => {
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(false);
	const spirnts = useSelector((store) => store.sprints);
	useEffect(() => {
		setLoader(true);
		dispatch(getSprints()).then((res) => setLoader(false));
	}, [dispatch]);
	return (
		<div>
			{loader ? (
				<Loader />
			) : (
				spirnts.map((e, i) => <Sprint key={i} tasks={e.tasks} id={e._id} />)
			)}
		</div>
	);
};

export default MainContent;
