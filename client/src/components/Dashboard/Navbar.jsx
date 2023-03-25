import React from 'react';
import { Avatar, Text, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/action';
import Loader from '../Loader/Loader';
const Navbar = () => {
	const [loader, setLoader] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const token = localStorage.getItem('token');
	useEffect(() => {
		setLoader(true);
		fetch('https://paypal-edfn.onrender.com/loginUser', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				dispatch(createUser(res));
				setLoader(false);
			});
	}, []);
	return (
		<Flex
			justifyContent="space-between"
			p={4}
			alignItems="center"
			background="gray.300"
		>
			<Text fontWeight="bold" fontSize="24px">
				Task Manager
			</Text>
			{loader ? (
				<Loader />
			) : (
				<Flex alignItems="center">
					<Text mr="10px" fontWeight="bold">
						{user && user.name}
					</Text>
					<Avatar mr="10px" src={user && user.imageUrl} />
				</Flex>
			)}
		</Flex>
	);
};

export default Navbar;
