import { Link } from 'react-router-dom';
import {useRef, useState, useEffect} from 'react';
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';

//will validate username.
//must start with lower or upper case letters. after that, it must be followed by 3-23 letters, numbers, hyphen, or underscore. username must be 4-24 char total.
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
//will vaidate password
//requires 1 lower case char, 1 uppercase char, 1 number, and 1 special char. must be between 8-24 char.
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/users/register'


const Register = ({setToken}) => {
    //will allow us to set focus on user input when component loads
    const userRef = useRef();
    //if we get an error, we need to put the focus on error
    const errRef = useRef();


    //tied to user input
    const [user, setUser] = useState('');
    //boolean. is name valid or not.
    const [validName, setValidName] = useState(false);
    //boolean. whether we have focus on input field or not
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    //add some state for possible error msg
    const [errMsg, setErrMsg] = useState('');
    //success message if successful
    const [success, setSuccess] = useState(false);

    //function runs everytime there is a rerender. once initially when component first loads and again whenever a change is made
    //sets the focus when the component loads
    useEffect(() => {
        userRef.current.focus();
    }, [])

    //we will validate username here. 
    //anytime username changes, it will check validation of that field
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log("USERNAME FIELD: ", user);
        setValidName(result);
    }, [user])
 
    //validate passwordFocus
    //anytime password changes, it will check validation in that field
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log("PASSWORD FIELD: ", password);
        setValidPassword(result);
        const match = password === matchPwd;
        setValidMatch(match);

    }, [password, matchPwd])

    //anytime the user clears out info in user, password, or matchPwd, we will clear out the error msg
    useEffect(() => {
        setErrMsg('');
    }, [user, password, matchPwd])


    const handleSubmit = async (e) => {
        e.preventDefault();

        //if button enabled with js hack
        //validate the info in the state of the user and password again. if false return err msg
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try{
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify({username: user, password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );

            //console.log("RESPONSE IN SUBMIT HANDLER: ", JSON.stringify(response));
            
            //maybe clear input field here

            //WHAT WE GET BACK FROM THE SERVER
    

            console.log("REGISTER CONTENT: ", response)

            const token = response.data.token

            console.log('TOKEN: ', token)

            setToken(token);
            setSuccess(true);
            
        }catch (error){
            // if no err response using optional chaining. maybe we lost connection with server. then return message
            if(!error?.response){
                setErrMsg('No Server Response');
            }
            //use optional chaining on the response. if err 409 occurs, username is already taken
            else if(error.response?.status === 409) {
                setErrMsg("Username Taken");
            }
            else {
                setErrMsg("Registration Failed");
            }
            //set focus on error field for screen readers
            errRef.current.focus();

        }
    }


    return (

        <>
        {/* if we have sucess state is true, we'll display a section that says success!, else if state is false, we show the section with form  */}
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                <Link to='/users/login'>Click here to Login</Link>
                </p>
            </section>
        ) : (

        <div className="">
            <section>
                             {/* if the error msg exists, use className "errmsg", else use classname "offscreen"   */}
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    {/* ==== USERNAME ==== */}
                    <label htmlFor="username">Username: 
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required                            aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    {/* paragraph for aria screen reader. Better acessibility */}
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    {/* ====== PASSWORD ===== */}
                    <label htmlFor="password">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>

                    {/* ===== CONFIRM PASSWORD ===== */}
                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>

                    {/* if we do not have a vailid name ot we don't have a valid password or we don't have a matching password, disable set to true; else disable set to false */}
                    <button disabled={!validName || !validPassword || !validMatch ? true : false}>Sign Up</button>


                </form>
                
            
                    <span className="line">
                        {/*put router link here*/}
                        <p className='form-group member'>Already a member? <Link to='/users/login'>Click here to Login</Link></p>
                    </span>
                
            </section>
           
        </div>

        )}
    </>
    )
}


export default Register;






