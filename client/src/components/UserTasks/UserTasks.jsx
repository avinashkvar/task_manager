import React, { useState } from 'react';
import { Text, Card, VStack, Flex, Box, Icon, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { AiFillDelete } from 'react-icons/ai';
const UserTasks = () => {
	const { id } = useParams();
	const [tasks, setTasks] = useState([]);
	const [user, setUser] = useState({});
	const [loader, setLoader] = useState(false);

	const getData = () => {
		setLoader(true);
		fetch(`https://paypal-edfn.onrender.com/tasks/${id}`)
			.then((res) => res.json())
			.then((res) => {
				setLoader(false);
				setTasks(res);
			});
	};
	useEffect(() => {
		getData();
	}, [id]);

	useEffect(() => {
		setLoader(true);
		fetch(`https://paypal-edfn.onrender.com/user/${id}`)
			.then((res) => res.json())
			.then((res) => {
				setUser(res);
				setLoader(false);
			});
	}, [id]);

	const handleDelete = (id) => {
		setLoader(true);
		fetch(`https://paypal-edfn.onrender.com/task/${id}`, {
			method: 'DELETE',
		}).then(() => getData());
	};
	return (
		<>
			{loader ? (
				<Loader />
			) : (
				<VStack>
					<Text fontSize="20px" fontWeight="bold">
						{user.name}'s tasks
					</Text>
					{tasks.length === 0 ? (
						<Text fontSize="20px" fontWeight="bold">
							No Task assinged to {user.name}
						</Text>
					) : (
						tasks.map((e) => (
							<Card padding="15px" width="90%">
								<Flex
									justifyContent="space-between"
									alignItems="center"
								>
									<Text fontSize="20px" fontWeight="bold">
										{e.title}
									</Text>
									<Box>
										<Button colorScheme='red' onClick={() => handleDelete(e._id)}>
											<Icon fontSize="30px" as={AiFillDelete}></Icon>
										</Button>
									</Box>
								</Flex>
							</Card>
						))
					)}
				</VStack>
			)}
		</>
	);
};

export default UserTasks;
