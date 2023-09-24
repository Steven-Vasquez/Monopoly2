import { Link } from 'react-router-dom';
import axiosInstance from '../../backend/axiosInstance.ts';
import '../stylesheets/Navbar.css';
import { useState } from 'react';
import { Button } from './Button.tsx';

function NavBar(props: any) {
    const { loggedIn, /*username*/ } = props;

    const [scrollPos, setScrollPos] = useState(0);

    const handleLogoutRequest = () => {
        axiosInstance.get("/logout")
            .then(res => {
                console.log(res);
                window.location.href = "/";
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleScroll = () => { 
        setScrollPos(window.scrollY);
      };

    return (
        <div className='navbar'>
            <ul id='navbar-list'>
                {loggedIn ? (
                    <li onClick={handleLogoutRequest}>
                        <Link to={''}>Logout</Link>
                    </li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
                <Button width="auto" variant='primary'>Home</Button>
                <Button width="auto" variant='secondary'>Games</Button>
                {/* <li><Link to="/">Home</Link></li>
                <li><Link to="/hub">Games</Link></li> */}
            </ul>
        </div>
    )
}

export default NavBar;
