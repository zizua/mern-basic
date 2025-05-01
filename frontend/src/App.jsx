import { useState } from 'react';
import { HStack, Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <HStack>
        <Box minH={'100vh'}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route />
          </Routes>
        </Box>
      </HStack>
    </>
  );
}

export default App;
