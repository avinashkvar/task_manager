import React from 'react';
import { CircularProgress, Center, Text, VStack } from '@chakra-ui/react';
const Loader = () => {
	return (
		<Center>
			<VStack>
				<Text fontWeight="bold" fontSize="25px">
					Please wait render will take time.....
				</Text>
				<CircularProgress isIndeterminate color="blue.300" />;
			</VStack>
		</Center>
	);
};

export default Loader;
