import React, {useState, useEffect} from "react";
import '../css/common.css';

export default function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const loginUser = (e) => {
        let dataToSend = {
            email: email,
            password: password
        }
        fetch('http://127.0.0.1:5000/login',
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
            window.location.href = "/user-dashboard/"
          });
    }

    return (
            <form>
                <h3>Log In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input onChange={handleEmailChange} type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={handlePasswordChange} type="password" className="form-control" placeholder="Enter password" />
                </div>


                <button onClick={loginUser} type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        );
}