import { useRef, useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from '../api/axios';

import AuthContext from '../context/AuthProvider';

const LOGIN_URL = '/users/login'

const Login = ({setToken, user, setUser}) => {
    //if we successfully authenticate when we login, we will use setAuth state and store it in the global context
    const {setAuth} = useContext(AuthContext);

    //console.log('LOGIN USER: ', user)

    //to set focus on the username input when the component first loads
    const userRef = useRef();
    //to set focus on the error when it occurs
    const errRef = useRef();

    // const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [success, setSuccess] = useState(false);

    //set the focus on the username input when the component loads. no dependancies so this will only happen when component loads
    useEffect(() => {
        userRef.current.focus();
    }, [])

    //empty out any error messages we might have if the user changes the user state or password state
    useEffect(() => {
        setErrMessage('');
    }, [user, password])

    //handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // LOGIN_URL will attach itself to the BASE_URL in the axios file 
            const response = await axios.post(LOGIN_URL,
                //the rest api is expecting username and password
                JSON.stringify({ username: user, password }),
                {
                    //
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
           
            //console.log("RESPONSE?.DATA: ", JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));

            //get back the data property that is inside of the response
            console.log('LOGIN RESPONSE.DATA: ', response.data)

            //console.log('RESPONSE.DATA.USER: ', response.data.user )

            const newToken = response.data.token
            const newUser = response.data.user ;

            //token will need to be stored on state 
            setToken(newToken);
            console.log('token', newToken);
            //set the user in state
            setUser(newUser);
            console.log('NEWUSER: ', newUser);

            //save data to local storage
            localStorage.setItem('token', newToken);

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, password, roles, accessToken });


            //clear user and password and set success status to true
            setUser('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMessage('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMessage('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMessage('Unauthorized');
            } else {
                setErrMessage('Login Failed');
            }
            errRef.current.focus();
        }
    }

    


    return (
        <div>
             {/* if we have sucess state is true, we'll display a section that says success!, else if state is false, we show the section with form  */}
            {success ? (
                <section>
                    <h2 >Welcome, <span>{user.username}! You are logged in!</span></h2>
                    <br />
                    <p>
                        <Link to='/users/me'>Go to the Profile Page</Link>
                    </p>
                </section>
            ) : (

            <section>
                <p ref={errRef} className={errMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errMessage}</p>
                <h1>Sign In</h1>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />

                    <button>Sign In</button>


                </form>

                <p className='form-group notMember'>Not a member? <Link to='/users/register'>Click here to register</Link></p>

            </section>

            )}

        </div>
    )
}




export default Login;