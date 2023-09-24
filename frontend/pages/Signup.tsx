import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '../components/TextField.tsx';
import { Button } from '../components/Button.tsx';
import axiosInstance from '../../backend/axiosInstance.ts';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axiosInstance.post("/register", {
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
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}>
                        </TextField>
                        <TextField
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </TextField>
                        <TextField
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </TextField>
                        <TextField
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </TextField>
                        {/* <button type="submit">Register (DEV)</button> */}
                        <div className="form-button-container">
                            <Button type="submit" style={{ width: "100%" }}>Sign Up</Button> 
                        </div>
                    </form>
                    <div className="account-action-links">
                        <p><Link to="/login">Already have an account?</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
