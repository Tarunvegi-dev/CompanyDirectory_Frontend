import { Box, Heading } from '@chakra-ui/react';
import DirectoryContainer from './components/DirectoryContainer.jsx'; 

function App() {
  return (
    <Box p={4} bg="gray.50" minH="100vh">
      <Heading as="h1" size="2xl" mb={6} color="teal.700" textAlign="center">
        🏢 Companies Directory
      </Heading>      
      <DirectoryContainer /> 
      
    </Box>
  );
}

export default App;