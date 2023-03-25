import React, { useState } from 'react';
import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Text,
	Avatar,
	Flex,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	HStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getSprints } from '../../redux/action';
import Loader from '../Loader/Loader';
const Done = ({ item }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const users = useSelector((store) => store.users);
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(false);
	const handleClick = (value, id) => {
		setLoader(true);
		let payload = {
			status: value,
		};
		fetch(`https://paypal-edfn.onrender.com/tasks/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(payload),
		}).then(() => {
			dispatch(getSprints()).thne(() => setLoader(false));
		});
	};
	const handleSubmit = (id, userId) => {
		setLoader(true);
		const payload = {
			userId,
		};
		fetch(`https://paypal-edfn.onrender.com/tasks/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(payload),
		}).then(() => {
			dispatch(getSprints()).then(() => setLoader(false));
			onClose();
		});
	};
	return (
		<div>
			{loader ? (
				<Loader />
			) : (
				<Card m={2}>
					<CardHeader>
						<Flex alignItems="center">
							<Avatar src={item.userId.imageUrl}></Avatar>
							<Text ml="10px">{item.userId.name}</Text>
						</Flex>
					</CardHeader>

					<CardBody>
						<Text fontWeight="bold">{item.title}</Text>
					</CardBody>

					<CardFooter>
						<Flex gap={2}>
							<Button>Assign To</Button>
							<Menu>
								<MenuButton
									background="green"
									color="white"
									as={Button}
								>
									{item.status}
								</MenuButton>
								<MenuList>
									<MenuItem
										onClick={() => handleClick('progress', item._id)}
									>
										Progress
									</MenuItem>
									<MenuItem
										onClick={() => handleClick('done', item._id)}
									>
										Done
									</MenuItem>
									<MenuItem
										onClick={() => handleClick('pending', item._id)}
									>
										Pending
									</MenuItem>
								</MenuList>
							</Menu>
						</Flex>
					</CardFooter>
					<Modal
						onClose={onClose}
						isOpen={isOpen}
						scrollBehavior={'inside'}
					>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Assign to</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								{users
									// .filter((e) => e.name.toLowerCase().includes(search))
									.map((e) => (
										<Card
											p="5px 10px 5px 10px"
											width="100%"
											transition="all 0.2s ease-in-out"
											_hover={{
												background: 'rgb(179,212,255)',
												cursor: 'pointer',
												width: '90%',
												transition: 'all 0.2s ease-in-out',
											}}
											onClick={() => handleSubmit(item._id, e._id)}
										>
											<HStack>
												<Avatar src={e.imageUrl}></Avatar>{' '}
												<Text fontWeight="bold">{e.name}</Text>
											</HStack>
										</Card>
									))}
							</ModalBody>
							<ModalFooter>
								<Button onClick={onClose}>Close</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</Card>
			)}
		</div>
	);
};

export default Done;
