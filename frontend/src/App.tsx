import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from './containers/Home';
import Stats from './containers/Stats';

import './styles/main.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
