import React, { useEffect } from 'react';
import {
	Button,
	Avatar,
	VStack,
	Text,
	Card,
	HStack,
	Input,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../redux/action';
import { useState } from 'react';
const Sidebar = () => {
	const dispatch = useDispatch();
	const users = useSelector((store) => store.users);
	const [search, setSearch] = useState('');
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);
	return (
		<VStack>
			<Button colorScheme="blue" width="80%" m="10px">
				Add Sprint
			</Button>
			<Text fontWeight="bold" fontSize="24px">
				Users
			</Text>
			<Input
				placeholder="Search for users"
				width="80%"
				onChange={(e) => setSearch(e.target.value)}
			></Input>
			{users
				.filter((e) => e.name.toLowerCase().includes(search))
				.map((e) => (
					<Card
						p="5px 10px 5px 10px"
						width="80%"
						transition="all 0.2s ease-in-out"
						_hover={{
							background: 'rgb(179,212,255)',
							cursor: 'pointer',
							width: '90%',
							transition: 'all 0.2s ease-in-out',
						}}
					>
						<HStack>
							<Avatar src={e.imageUrl}></Avatar>{' '}
							<Text fontWeight="bold">{e.name}</Text>
						</HStack>
					</Card>
				))}
		</VStack>
	);
};

export default Sidebar;
