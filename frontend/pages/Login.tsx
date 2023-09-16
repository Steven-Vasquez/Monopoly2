import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '../components/TextField.tsx';
import "../stylesheets/AccountsForms.css"
import axios from 'axios';
import { Button } from '../components/Button.tsx';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    axios.defaults.withCredentials = true; // Allow cookies to be stored in the browser

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const handleSubmit = () => {
        //const formData = { email, password };

        axios.post("http://localhost:3001/login", {
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
                    alert(`Welcome back, ${email}!`);
                    window.location.href = "/lobby";
                }
            })
            .catch(err => {
                console.log(err);
            });

    }
    return (
        <div>
            <div className="form-page-container">
                <h1>MONOPOLY</h1>
                {errorMessage && <p>Error: {errorMessage}</p>}
                <div className="form-container">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            id="username"
                            name="username"
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
                        {/* <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="username"
                    name="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> */}

                        {/* <button type="submit">Login (DEV)</button> */}
                        <div className="form-button-container">
                            <Button label="Login" width="100%"></Button>
                        </div>
                    </form>
                    <div className="account-action-links">
                        <p><Link to="/register">Don't have an account?</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login;
