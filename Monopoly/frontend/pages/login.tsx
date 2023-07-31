import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = { email, password };

        fetch('http://localhost:3001/login', {
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
                    navigate('/');
                }
                else {
                    setErrorMessage(data.error);
                }

            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
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

        </div>
    )
}


export default Login;