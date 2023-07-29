//import React, {useState} from 'react';
//import {useNavigate, Navigate} from 'react-router-dom';

function Register() {
    return(
        <div>
            <h1>Register</h1>

            <form method="post" action="/register">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
                
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />

                <label htmlFor="password">Confirm Password</label>
                <input type="password" id="password" name="password" />

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;
