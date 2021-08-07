import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import '../css/common.css';

export default function AdminRegisterComponent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dept, setDept] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleDeptChange = (e) => {
        setDept(e.target.value)
    }

    const registerAdmin = (e) => {
        let dataToSend = {
            name: name,
            email: email,
            password: password,
            department: dept
        }
        fetch('http://127.0.0.1:5000/admin_register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
          }).then(
          (result) => {
            if (result.ok) {
                localStorage.setItem('user_logged_in', 'admin')
                window.location.href = '/admin-dashboard';
            }
          })
    }

    return (
        <form>
            <h3>Sign Up As Admin</h3>

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

            <div className="form-group">
                <label>Department</label>
                <input onChange={handleDeptChange} type="text" className="form-control" placeholder="Department" />
            </div>

            <button onClick={registerAdmin} type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <Link className="nav-link" to={"/sign-in"}>Admin Sign in</Link>
            </p>
        </form>
    )
}