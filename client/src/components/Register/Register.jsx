import React from 'react';
import {
	Card,
	Center,
	Input,
	Button,
	Text,
	FormControl,
	FormLabel,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
	const toast = useToast();
	const navigate = useNavigate();
	//const [info, setInfo] = useState(new FormData());
	const [validate, setValidate] = useState({
		name: '',
		email: '',
		password: '',
		photo: '',
	});

	const handleChange = (e) => {
		//console.log(e.target.files[0])
		if (e.target.files) {
			setValidate({
				...validate,
				[e.target.id]: e.target.files[0],
			});
		} else {
			setValidate({
				...validate,
				[e.target.id]: e.target.value,
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const info = new FormData();
		for (let key in validate) {
			info.append(key, validate[key]);
		}
		fetch('http://localhost:3001/register', {
			method: 'POST',
			body: info,
		})
			.then((res) => res.json())
			.then((res) => {
				if (!res.name) {
					toast({
						title: res,
						status: 'error',
						duration: 2000,
						isClosable: true,
					});
					return;
				}
				toast({
					title: 'Account created.',
					description: "We've created your account for you.",
					status: 'success',
					duration: 2000,
					isClosable: true,
				});
				navigate('/login');
			});
	};
	return (
		<Center>
			<Card p="20px" margin="30px" width={['100%', '75%', '40%']}>
				<FormControl isRequired>
					<Center>
						<Text fontWeight="bold" fontSize="30px">
							SignUp
						</Text>
					</Center>
					<FormLabel>Enter your name</FormLabel>
					<Input
						margin="10px"
						placeholder="Enter your name"
						id="name"
						onChange={handleChange}
					></Input>
					<FormLabel>Enter your email</FormLabel>
					<Input
						margin="10px"
						placeholder="Enter your email"
						id="email"
						onChange={handleChange}
					></Input>
					<FormLabel>Enter your password</FormLabel>
					<Input
						margin="10px"
						placeholder="Enter your password"
						id="password"
						onChange={handleChange}
					></Input>
					<FormLabel>Choose your Profile Pic</FormLabel>
					<Input
						margin="10px"
						type="file"
						placeholder="Select Photo"
						id="photo"
						onChange={handleChange}
					></Input>
					<Button
						isDisabled={
							!validate.name ||
							!validate.photo ||
							!validate.email ||
							!validate.password
						}
						width="100%"
						colorScheme="orange"
						onClick={handleSubmit}
					>
						Submit
					</Button>
					<Text float="right" p="5px">
						Already have an Account?{' '}
						<Link style={{ color: 'blue' }} to="/login">
							Sing In
						</Link>
					</Text>
				</FormControl>
			</Card>
		</Center>
	);
};

export default Register;
