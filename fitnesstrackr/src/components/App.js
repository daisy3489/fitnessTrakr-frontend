import Home from './Home';
import Routines from './Routines';
import Navbar from './Navbar'
// import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';

function App() {
  const [token, setToken] = useState('');
  const [routines, setRoutines] = useState({});




  return (
    <Router>
      <div className="App">
        <Navbar token={token} />
        <div className="content">
          <Routes>
            <Route path="/home" element={<Home />} ></Route>
            <Route path="/routines" element={<Routines routines={routines} setRoutines={setRoutines} />}></Route>
          </Routes>
        </div>
      </div>
      
    </Router>
  );
}

export default App;
