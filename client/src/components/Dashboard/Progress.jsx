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
} from '@chakra-ui/react';
const Progress = ({ item }) => {
	return (
		<div>
				<Card>
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
						<Flex>
							<Button>Assign To</Button>
							<Button>{item.status}</Button>
						</Flex>
					</CardFooter>
				</Card>
			
		</div>
	);
};

export default Progress;
