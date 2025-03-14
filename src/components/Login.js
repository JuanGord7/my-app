import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                login: username,
                password: password
            });
            if (response.status === 200) {
                setMessage(response.data.message);
                if (response.data.message === "The provided credentials are correct. User authenticated.") {
                    setIsAuthenticated(true);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    };

    const cancel = () => {
        setUsername('');
        setPassword('');
        setMessage('');
    };

    return (
        <div className="login-form">
            <h2>Inicio de sesión</h2>
            <form onSubmit={login}>
                <label>Nombre de usuario</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="button-group">
                    <button type="submit" className="btn-ingresar">Ingresar</button>
                    <button type="button" className="btn-cancelar" onClick={cancel}>Cancelar</button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;