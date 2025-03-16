import React, { useState } from 'react';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import './Login.css';

function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const intl = useIntl();

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                login: username,
                password: password
            });
            if (response.status === 200) {
                setMessage(response.data.message);
                setIsError(false);
                if (response.data.message === "The provided credentials are correct. User authenticated.") {
                    setIsAuthenticated(true);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage(intl.formatMessage({ id: 'login.error' }));
                setIsError(true);
            } else {
                console.log(error);
            }
        }
    };

    const cancel = () => {
        setUsername('');
        setPassword('');
        setMessage('');
        setIsError(false);
    };

    return (
        <div className={"login-form"}>
            <h2><FormattedMessage id="login.title" defaultMessage="Inicio de sesión" /></h2>
            <form onSubmit={login}>
                <label><FormattedMessage id="login.username" defaultMessage="Nombre de usuario" /></label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label><FormattedMessage id="login.password" defaultMessage="Contraseña" /></label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="button-group">
                    <button type="submit" className="btn-ingresar"><FormattedMessage id="login.submit" defaultMessage="Ingresar" /></button>
                    <button type="button" className="btn-cancelar" onClick={cancel}><FormattedMessage id="login.cancel" defaultMessage="Cancelar" /></button>
                </div>
            </form>
            {message && <p className={`message ${isError ? 'error-message' : ''}`}>{message}</p>}
        </div>
    );
}

export default Login;