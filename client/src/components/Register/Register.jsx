import React from 'react';
import {
	Card,
	Center,
	Input,
	Button,
	Text,
	FormControl,
	FormLabel,
} from '@chakra-ui/react';
import { useState } from 'react';

const Register = () => {
	const [info, setInfo] = useState(new FormData());

	const handleChange = (e) => {
		//console.log(e.target.files[0])
		if (e.target.files) {
			 info.append([e.target.id],e.target.files[0])
             setInfo(info)
		} else {
			info.append([e.target.id],e.target.value)
            setInfo(info)
		}
		
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch('http://localhost:3001/register', {
			method: 'POST',
			body: info,
		});
	};
	return (
		<Center>
			<Card p="20px" margin="30px" width={['100%', '75%', '40%']}>
				<FormControl isRequired>
					<Center>
						<Text fontWeight="bold">SignUp</Text>
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
					<Button width="100%" colorScheme="orange" onClick={handleSubmit}>
						Submit
					</Button>
				</FormControl>
			</Card>
		</Center>
	);
};

export default Register;
