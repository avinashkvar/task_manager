import React, { useState } from 'react';
import {
	Text,
	Card,
	VStack,
	Flex,
	Icon,
	Button,
	Input,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { AiFillDelete } from 'react-icons/ai';
import { MdModeEditOutline } from 'react-icons/md';
const UserTasks = () => {
	const { id } = useParams();
	const [tasks, setTasks] = useState([]);
	const [user, setUser] = useState({});
	const [loader, setLoader] = useState(false);
	const [patch, setPatch] = useState(false);
	const [text, setText] = useState('');

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

	const handlePatch = (id) => {
		setLoader(true);
		const payload = {
			title: text,
		};
		fetch(`https://paypal-edfn.onrender.com/tasks/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(payload),
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
									{patch ? (
										<Input
											value={text}
											onChange={(e) => setText(e.target.value)}
										></Input>
									) : (
										<Text fontSize="20px" fontWeight="bold">
											{e.title}
										</Text>
									)}
									<Flex gap="10px">
										{patch ? (
											<Button
												colorScheme="blue"
												onClick={() => {
													handlePatch(e._id);
													setPatch(false);
												}}
											>
												Submit
											</Button>
										) : (
											<>
												<Button
													colorScheme="orange"
													onClick={() => {
                                                        setText(e.title)
														setPatch(true);
													}}
												>
													<Icon
														fontSize="30px"
														as={MdModeEditOutline}
													></Icon>
												</Button>
												<Button
													colorScheme="red"
													onClick={() => handleDelete(e._id)}
												>
													<Icon
														fontSize="30px"
														as={AiFillDelete}
													></Icon>
												</Button>{' '}
											</>
										)}
									</Flex>
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
