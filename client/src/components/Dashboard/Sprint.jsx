import React from 'react';
import {
	Button,
	Text,
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
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSprints, postTask } from '../../redux/action';
import Progress from './Progress';
import Done from './Done';
import Pending from './Pending';
import Loader from '../Loader/Loader';
import './scroll.css'

const Sprint = ({ tasks, id }) => {
	const [title, setTitle] = useState('');
	const [loader, setLoader] = useState(false);
	const user = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleClick = () => {
		setLoader(true);
		dispatch(postTask({ title, userId: user._id }, id)).then(() => {
			dispatch(getSprints()).then(() => {
				setLoader(false);
				onClose();
			});
		});
	};
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
				<Icon as={AiOutlinePlus}></Icon>
			</Button>

			{loader ? (
				<Loader />
			) : (
				<div
					style={{
						display: 'flex',
						gap: '10px',
						justifyContent: 'space-evenly',
					}}
				>
					<div
						style={{
							width: 'auto',
							boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
							padding: '20px',
							height: '500px',
							overflow: 'scroll',
							overflowX: 'hidden',
						}}
						className="scroll"
					>
						<Text fontWeight="bold" fontSize="23px">
							Progress
						</Text>
						{tasks.length > 0 &&
							tasks.map((e) => (
								<div>
									{e.status === 'progress' ? (
										<Progress item={e} />
									) : null}
								</div>
							))}
					</div>
					<div
						style={{
							boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
							padding: '20px',
							height: '500px',
							overflow: 'scroll',
							overflowX: 'hidden',
						}}
						className="scroll"
					>
						<Text fontWeight="bold" fontSize="23px">
							Done
						</Text>
						{tasks.length > 0 &&
							tasks.map((e) => (
								<div>
									{e.status === 'done' ? <Done item={e} /> : null}
								</div>
							))}
					</div>
					<div
						style={{
							boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
							padding: '20px',
							height: '500px',
							overflow: 'scroll',
							overflowX: 'hidden',
						}}
						className="scroll"
					>
						<Text fontWeight="bold" fontSize="23px">
							Pending
						</Text>
						{tasks.length > 0 &&
							tasks.map((e) => (
								<div>
									{e.status === 'pending' ? (
										<Pending item={e} />
									) : null}
								</div>
							))}
					</div>
				</div>
			)}
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Task</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack>
							<Input
								placeholder="Enter Title"
								onChange={(e) => setTitle(e.target.value)}
							></Input>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button
							isDisabled={!title}
							colorScheme="green"
							onClick={handleClick}
						>
							Add
						</Button>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Sprint;
