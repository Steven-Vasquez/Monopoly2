import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    axios.defaults.withCredentials = true; // Allow cookies to be stored in the browser
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
                    alert(res.data.message);
                } else {
                    alert(`New account created for ${username}!`);
                    window.location.href = "/lobby";
                }
            })
            .catch(err => {
                console.log(err);
            });

        /*
        fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the server
                console.log('data is:');
                console.log(data);

                if (data.success) {
                    navigate('/lobby');
                }
                else {
                    setErrorMessage(data.error);
                }

            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
            */
    };


    return (
        <div>
            <h1>Register</h1>

            {errorMessage && <p>Error: {errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
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
                />

                <label htmlFor="confirmPassword">Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />


                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;
