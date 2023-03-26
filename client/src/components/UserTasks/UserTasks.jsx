import React from 'react';
import { Text, Card, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
const UserTasks = () => {
	const { id } = useParams();
	useEffect(() => {
		fetch(`https://paypal-edfn.onrender.com/tasks/${id}`)
			.then((res) => res.json())
			.then((res) => console.log(res));
	}, [id]);
	return (
		<VStack>
			<Text></Text>
		</VStack>
	);
};

export default UserTasks;
