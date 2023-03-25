import React from 'react';
import {
	Card,
	Button,
	Text,
	Avatar,
	CardHeader,
	CardBody,
	CardFooter,
	Flex,
	Icon,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
    VStack,
    Input,
    Select,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
const Sprint = ({ tasks }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<div
			style={{
				display: 'flex',
				gap: '20px',
				boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
				padding: '10px',
				margin: '10px',
			}}
		>
			<Button colorScheme="green" onClick={onOpen}>
				Add Tasks
				<Icon as={AiOutlinePlus}></Icon>
			</Button>
			<div
				style={{
					display: 'flex',
					gap: '20px',
					boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
					padding: '10px',
					margin: '10px',
				}}
			>
				{tasks.map((e) => (
					<Card>
						<CardHeader>
							<Flex alignItems="center">
								<Avatar src={e.userId.imageUrl}></Avatar>
								<Text ml="10px">{e.userId.name}</Text>
							</Flex>
						</CardHeader>
						<CardBody>
							<Text fontWeight="bold">{e.title}</Text>
						</CardBody>
						<CardFooter>
							<Flex>
								<Button>Assign To</Button>
                                <Button>{e.status}</Button>
							</Flex>
						</CardFooter>
					</Card>
				))}
			</div>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Task</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
                        <VStack>
                             <Input placeholder='Enter Title'></Input>
                        </VStack>
                    </ModalBody>
					<ModalFooter>
						<Button colorScheme="green">Add</Button>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Sprint;
