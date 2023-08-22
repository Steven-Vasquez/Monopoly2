import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    axios.defaults.withCredentials = true; // Allow cookies to be stored in the browser


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
            <h1>Login</h1>

            {errorMessage && <p>Error: {errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
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
                />

                <button type="submit">Login</button>
            </form>

            <p>Don't have an account? <Link to="/register">Register</Link></p>

        </div>
    )
}


export default Login;
