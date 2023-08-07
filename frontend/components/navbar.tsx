import { Link } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/Navbar.css';

function NavBar(props: any) {
    const { loggedIn, /*username*/ } = props;

    const handleLogoutRequest = () => {
        axios.get("http://localhost:3001/logout")
            .then(res => {
                console.log(res);
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