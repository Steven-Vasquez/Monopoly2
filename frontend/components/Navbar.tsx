import { Link } from 'react-router-dom';
import axiosInstance from '../../backend/axiosInstance.ts';
import '../stylesheets/Navbar.css';
import { useState, useEffect } from 'react';
import { Button } from './Button.tsx';
import { Logo } from './Logo.tsx';
import { useNavigate } from "react-router-dom";

function NavBar() {
    // const { loggedIn, /*username*/ } = props;
    const [loggedIn, setLoggedIn] = useState<boolean>(false);  

    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get("/checkLogin")
        .then(res => {
            if (res.data.loggedIn === true) {
                setLoggedIn(true);
            }
            else {
            setLoggedIn(false);
            }
        })
        .catch(err => {
            setLoggedIn(false);
        })
    } ,[loggedIn]);

    const [scrollPos, setScrollPos] = useState(0);

    const handleLogoutRequest = () => {
        axiosInstance.get("/logout")
            .then(res => {
                console.log(res);
                navigate("/login");
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
            <div id="nav-left">
                <Logo size={32} spacing={4} />
                {loggedIn ? (<Link to={'/hub'}>Games</Link>) : (<></>)}
            </div>

            <ul id='nav-right'>
                {loggedIn ? (
                    <li onClick={handleLogoutRequest}>
                        <Link to={''}><Button variant='secondary'>Log Out</Button></Link>
                    </li>
                ) : (
                    <>
                        <li><Link to="/login"><Button variant='secondary'>Log In</Button></Link></li>
                        <li><Link to="/signup"><Button>Sign Up</Button></Link></li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default NavBar;
