import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '#components/general/TextField/TextField.tsx';
import { Button } from '#components/general/Button/Button.tsx';
import {Tab} from "#components/general/Tab/Tab.tsx";
import usePageTitle from '../../hooks/UsePageTitle.tsx';
import axiosInstance from '#backend/axiosInstance.ts';

function Signup() {
    usePageTitle('Sign Up');

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [activeTab, setActiveTab] = useState(''); // No tabs are active by default (for underline animation)
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

    // To get underline animation on page load
    // Workaround to set activeTab state to 'signup' on initial render since login tab is on a different page
    useEffect(() => {
        // Set a timeout to change the activeTab state after a brief delay for underline animation
        const timer = setTimeout(() => {
            setActiveTab('signup'); // Set signup tab as active by default
        }, 100);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(timer);
    }, [activeTab]);

    return (
        <div>
            <div className="form-page-container">
                <h1>MONOPOLY</h1>
                <div className="form-container">
                    <div className="tabs">
                        <Tab variant="link" linkTo="/login" className={`tab ${activeTab === 'login' ? 'active' : ''}`}>Log In</Tab>
                        <Tab variant="link" linkTo="/signup" className={`tab ${activeTab === 'signup' ? 'active' : ''}`}>Sign Up</Tab>
                    </div>
                    {errorMessage && <div className="error-msg"><p>Error: {errorMessage}</p></div>}
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

export default Signup;
