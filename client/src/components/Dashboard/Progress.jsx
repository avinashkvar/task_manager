import React from 'react';
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
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { getSprints } from '../../redux/action';
const Progress = ({ item }) => {
	const dispatch = useDispatch();
	const handleClick = (value, id) => {
		let payload = {
			status: value,
		};
		fetch(`http://localhost:3001/tasks/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(payload),
		}).then(() => dispatch(getSprints()));
	};
	return (
		<div>
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
							<MenuButton background="orange" color="white" as={Button}>
								{item.status}
							</MenuButton>
							<MenuList>
								<MenuItem
									onClick={() => handleClick('progress', item._id)}
								>
									Progress
								</MenuItem>
								<MenuItem onClick={() => handleClick('done', item._id)}>
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
			</Card>
		</div>
	);
};

export default Progress;
