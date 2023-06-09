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
import { getSprints, getUsers } from '../../redux/action';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
	const dispatch = useDispatch();

	const users = useSelector((store) => store.users);
	const [search, setSearch] = useState('');
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const addSprint = () => {
		fetch('https://paypal-edfn.onrender.com/sprints', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ tasks: [] }),
		}).then(() => {
			dispatch(getSprints());
		});
	};
	return (
		<VStack>
			<Button colorScheme="blue" width="80%" m="10px" onClick={addSprint}>
				Add Sprint
			</Button>
			<Link to='/dashboard' style={{
				width:'80%'
			}}>
			    <Button colorScheme='blue' width='100%'>Dashboard</Button>
			</Link>
			<Text fontWeight="bold" fontSize="24px">
				Users
			</Text>
			<Input
				placeholder="Search for users"
				width="80%"
				onChange={(e) => setSearch(e.target.value)}
			></Input>
			{users.length > 0 &&
				users
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
							<Link to={`/dashboard/user/${e._id}`}>
								<HStack>
									<Avatar src={e && e.imageUrl}></Avatar>{' '}
									<Text fontWeight="bold">{e && e.name}</Text>
								</HStack>
							</Link>
						</Card>
					))}
		</VStack>
	);
};

export default Sidebar;
