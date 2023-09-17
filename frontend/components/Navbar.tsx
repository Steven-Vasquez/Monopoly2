import { Link } from 'react-router-dom';
import axiosInstance from '../../backend/axiosInstance.ts';
import '../stylesheets/Navbar.css';

function NavBar(props: any) {
    const { loggedIn, /*username*/ } = props;

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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/hub">Games</Link></li>
            </ul>
        </div>
    )
}

export default NavBar;
