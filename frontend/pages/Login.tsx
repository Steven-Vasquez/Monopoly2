import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '../components/TextField.tsx';
import "../stylesheets/AccountsForms.css"
import axiosInstance from '../../backend/axiosInstance.ts';
import { Button } from '../components/Button.tsx';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function Login() {
    const [identifier, setIdentifier] = useState(''); // Combined email/username input

    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const handleSubmit = () => {
        //const formData = { email, password };

        axiosInstance.post("/login", {
            identifier: identifier, // Common key for both email and username
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (typeof res.data.message !== "undefined") {
                    setErrorMessage(res.data.message);

                    console.log(res.data.message);
                    alert(res.data.message);
                } else {
                    // alert(`Welcome back, ${res.data.username}!`);
                    // toast.success(`Welcome back, ${res.data.username}!`);
                    navigate("/hub");
                    // window.location.href = "/lobby";
                }
            })
            .catch(err => {
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(err.response.data.message);
                    setErrorMessage(err.response.data.message);

                } else if (err.request) {
                    // The request was made but no response was received
                    console.log('No response received:', err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            });

    }
    return (
        <div>
            <div className="form-page-container">
                <h1>MONOPOLY</h1>
                <div className="form-container">
                    <h2>Log In</h2>
                    {errorMessage && <div className="error-msg"><p>Error: {errorMessage}</p></div>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email or Username"
                            type="text"
                            id="identifier"
                            name="identifier"
                            required
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </TextField>
                        <div className="form-button-container">
                            <Button type="submit" style={{ width: "100%" }}>Log In</Button>
                        </div>
                    </form>
                    <div className="account-action-links">
                        <p><Link to="/signup">Don't have an account?</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login;
