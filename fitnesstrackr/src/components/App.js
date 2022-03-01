import { useState} from 'react';
import Home from './Home';
import Routines from './Routines';
// import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  const [routines, setRoutines] = useState({});




  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} ></Route>
        <Route path="/routines" element={<Routines routines={routines} setRoutines={setRoutines} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
