import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Tabla from './components/Tabla';
import RobotDetail from './components/RobotDetail';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div className="app-container">
            <h1>Adopta un Robot con Robot Lovers!</h1>
            <img src="./imgLogin.png" alt="Robot Lovers" className="app-image" />
            <Routes>
                <Route path="/" element={isAuthenticated ? <div className="content"><Tabla /><RobotDetail /></div> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/robots/:robotId" element={<div className="content"><Tabla /><RobotDetail /></div>} />
            </Routes>
        </div>
    );
}

export default App;