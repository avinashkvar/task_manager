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
import { Link,useNavigate } from 'react-router-dom';
const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
	const [login, setLogin] = useState({
		email: '',
		password: '',
	});
	const handleChange = (e) => {
		setLogin({
			...login,
			[e.target.id]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		fetch('http://localhost:3001/login', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(login),
		})
			.then((res) => res.json())
			.then((res) => {
				if (!res.data) {
					toast({
						title: res,
						status: 'error',
						duration: 2000,
						isClosable: true,
					});
					return;
				}
				toast({
					title: 'Sucessfully Loged In',
					status: 'success',
					duration: 2000,
					isClosable: true,
				});
        localStorage.setItem('token',res.data)
        navigate('/dashboard')
			});
	};
	return (
		<Center>
			<Card p="20px" margin="30px" width={['100%', '75%', '40%']}>
				<FormControl isRequired>
					<Center>
						<Text fontWeight="bold" fontSize="30px">
							SignIn
						</Text>
					</Center>
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
					<Button
						isDisabled={!login.email || !login.password}
						width="100%"
						colorScheme="orange"
						onClick={handleSubmit}
					>
						Submit
					</Button>
					<Text float="right" p="5px">
						Don't have an Account?{' '}
						<Link style={{ color: 'blue' }} to="/">
							Sing Up
						</Link>
					</Text>
				</FormControl>
			</Card>
		</Center>
	);
};

export default Login;
