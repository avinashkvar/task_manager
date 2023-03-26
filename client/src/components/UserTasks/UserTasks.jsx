import React, { useState } from 'react';
import { Text, Card, VStack,HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
const UserTasks = () => {
	const { id } = useParams();
	const [tasks, setTasks] = useState([]);
	const [user, setUser] = useState({});
	const [loader, setLoader] = useState(false);
	useEffect(() => {
		setLoader(true);
		fetch(`https://paypal-edfn.onrender.com/tasks/${id}`)
			.then((res) => res.json())
			.then((res) => {
				setLoader(false);
				setTasks(res);
			});
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
								<HStack>
									<Text fontSize="20px" fontWeight="bold">
										{e.title}
									</Text>
								</HStack>
							</Card>
						))
					)}
				</VStack>
			)}
		</>
	);
};

export default UserTasks;
