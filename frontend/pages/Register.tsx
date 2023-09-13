import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '../components/TextField.tsx';
import { Button } from '../components/Button.tsx';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    axios.defaults.withCredentials = true; // Allow cookies to be stored in the browser

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    const handleSubmit = () => {

        axios.post("http://localhost:3001/register", {
            username: username,
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {

                if (typeof res.data.message !== "undefined" && res.data.message > 0) {
                    setErrorMessage(res.data.message);
                    alert(res.data.message);
                } else {
                    alert(`New account created for ${username}!`);
                    window.location.href = "/lobby";
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <div className="form-page-container">
                <h1>MONOPOLY</h1>
                <div className="form-container">
                    <h2>Sign Up</h2>
                    {errorMessage && <p>Error: {errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}>
                        </TextField>
                        <TextField
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </TextField>
                        <TextField
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </TextField>
                        <TextField
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </TextField>
                        {/* <button type="submit">Register</button> */}
                        <div className="form-button-container">
                            <Link className="button-link" to={''} onClick={handleSubmit}>
                                <Button label="Register"></Button>
                            </Link>
                        </div>
                    </form>
                    <div className="action-links">
                        <p>Already have an account? <Link to="/login">Log in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
