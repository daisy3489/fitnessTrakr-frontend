import Home from './Home';
import Routines from './Routines';
import Activities from './Activities';
import Navbar from './Navbar'
import Register from './Register'
import Login from './Login'
import ProfilePage from './ProfilePage'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import MyRoutines from './MyRoutines';

const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";
function App() {
  const [token, setToken] = useState('');
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState({username: '', password: ''});
  const [username, setUsername] = useState({})

  // console.log(token)
// console.log("routines",routines)

//function runs everytime there is a rerender. once initially when component first loads and again whenever a change is made
  //by making the useEffect() function an async function, it automatically returns a Promise 
  useEffect(() => {
    if(localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));

      fetch(BASE_URL + '/users/me', {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      //The then() method returns a Promise
      .then((response) => {
        return response.json();
      })
      // .then((userInfo) => {
      //   setUser(userInfo.data)
      // })
      .then(result => {
        console.log('APP useEffect result: ', result);
        setUsername(result)
      })
      .catch ((error) => {
        console.error(error);
      }) 
      
    }
  },[])

  //FUNCTION TO Logout
  const Logout = () => {
    setUser({
      username: '', 
      password: ''
    });
    //clear localStorage
    localStorage.removeItem('token');
    setToken('')
    console.log('LOGOUT')
  }


 
    useEffect(() => {
       
       }, []);

 

  return (
    <Router>
      <div className="App">
        <Navbar token={token} />
        <div className="content">
          <Routes>
            <Route path="/home" element={<Home />} ></Route>
            <Route path="/routines" element={<Routines routines={routines} setRoutines={setRoutines} token={token} username = {username} />}></Route>
            <Route path="/activities" element={<Activities activities={activities} setActivities ={setActivities} token = {token} />}></Route>
            <Route path="/users/register" element={<Register setToken={setToken} user={user}/>} ></Route>
            <Route path="/users/login" element={<Login token={token} setToken={setToken} user={user} setUser={setUser} />} ></Route>
            <Route exact path="/users/me" element={<ProfilePage Logout={Logout} user={user}></ProfilePage>}></Route>
            <Route exact path="/myroutines" element={<MyRoutines token ={token} routines={routines}
             setRoutines={setRoutines} user ={user} activities= {activities} setActivities ={setActivities} username ={username} />}></Route>

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
