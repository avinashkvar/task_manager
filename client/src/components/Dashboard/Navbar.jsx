import React from 'react';
import {
	Avatar,
	Text,
	Flex,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	Portal,
	Button,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/action';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);
	const token = localStorage.getItem('token');
	useEffect(() => {
		fetch('https://paypal-edfn.onrender.com/loginUser', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				dispatch(createUser(res));
			});
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};
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

			<Flex alignItems="center">
				<Popover>
					<PopoverTrigger>
						<Avatar mr="10px" src={user && user.imageUrl} />
					</PopoverTrigger>
					<Portal>
						<PopoverContent>
							<PopoverArrow />
							<PopoverHeader>Hey! {user && user.name}</PopoverHeader>
							<PopoverCloseButton />
							<PopoverBody>
								<Button
									colorScheme="orange"
									onClick={() => handleLogout()}
								>
									Logout
								</Button>
							</PopoverBody>
						</PopoverContent>
					</Portal>
				</Popover>
			</Flex>
		</Flex>
	);
};

export default Navbar;
