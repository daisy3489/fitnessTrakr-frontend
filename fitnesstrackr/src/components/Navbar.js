import {Link} from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = ({token}) => {

    useEffect(() => {
       
    }, [token]);


    
    return (
        <nav className="navbar">
            <h1><Link to="/home">Fitness Trakr</Link></h1>
            <div className="links">
                <Link to='/home'>Home</Link>
                <Link to='/routines'>Routines</Link>
                <Link to='/activities'>Activities</Link>
                {/* if token, show profile page, else if NO token, show login link */}
                {token && <Link to='/users/me'>Profile</Link> }
                {!token && <Link to='/users/login'>Login</Link>}
            </div>
        </nav>
    )
}

export default Navbar;





