import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IntlProvider, FormattedMessage } from 'react-intl';
import Login from './components/Login';
import Tabla from './components/Tabla';
import RobotDetail from './components/RobotDetail';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import messages_es from './translations/es.json';
import messages_en from './translations/en.json';

const messages = {
    'es': messages_es,
    'en': messages_en
};

const language = navigator.language.split(/[-_]/)[0];  // Detecta el idioma del navegador

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <div className="app-container">
                <h1 className="title-shadow">
                    <FormattedMessage id="app.title" defaultMessage="Adopta un Robot con Robot Lovers!" />
                </h1>
                <img src="./imgLogin.png" alt="Robot Lovers" className="app-image shadow-box" />
                <Routes>
                    <Route path="/" element={isAuthenticated ? <div className="content"><div class="col-7"><Tabla /></div></div> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/robots/:robotId" element={<div className="content"><div class="col-7"><Tabla /></div><div class="col-5"><RobotDetail /></div></div>} />
                </Routes>
                <p className="contact-info">Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</p>
            </div>
        </IntlProvider>
    );
}

export default App;