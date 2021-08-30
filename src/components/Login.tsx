import React, { useState } from 'react';
import axios from '../axios/axios';
import Loader from './Loader';
import './login.css';


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const loginAction = async (e: any) => {
        e.preventDefault()
        if (email == '' && password == '') {
            alert('input invalid');
            return;
        }
        setIsLoading(true)
        await axios.post('/api/login', {
            email: email,
            password: password
        }).then((res: any) => {
            console.log("res body: ", res)
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                window.location.href = "/home";
            }
        }).catch((e: any) => {
            console.log("error: ", e.response)
            if (e.response.status == 400) {
                alert(e.response.data.error)
            }
        })
        setIsLoading(false)
    }
    return (
        <>
            <form className="login" onSubmit={(e) => { loginAction(e) }}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">
                    <div>{isLoading ? <Loader /> : 'Login'}</div>
                </button>

            </form>
        </>
    );
}