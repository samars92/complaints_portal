import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import '../css/common.css';

export default function RegisterComponent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const registerUser = (e) => {
        let dataToSend = {
            name: name,
            email: email,
            password: password

        }
        fetch('http://127.0.0.1:5000/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
          }).then(function(response) {
            return response.json();
          }).then(function(response) {
            localStorage.setItem('user_logged_in', 'customer')
            localStorage.setItem('user_id', response.user_id)
            window.location.href = "/user-dashboard"
          });
    }

    return (
        <form>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>name</label>
                <input onChange={handleNameChange} type="text" className="form-control" placeholder="name" />
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input onChange={handleEmailChange} type="email" className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input onChange={handlePasswordChange} type="password" className="form-control" placeholder="Enter password" />
            </div>

            <button onClick={registerUser} type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
            </p>
        </form>
    )
}