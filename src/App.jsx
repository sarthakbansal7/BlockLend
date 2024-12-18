import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Lending from './pages/Lending';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/lending" element={<Lending />} />
      </Routes>
    </>
  );
}

export default App;