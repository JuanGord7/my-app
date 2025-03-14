import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Tabla() {
    const [robots, setRobots] = useState([]);

    useEffect(() => {
        const fetchRobots = async () => {
            try {
                const response = await axios.get('http://localhost:3001/robots');
                setRobots(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRobots();
    }, []);

    return (
        <div className="container tabla-container">
            <h2>Lista de Robots</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Modelo</th>
                        <th>Empresa Fabricante</th>
                    </tr>
                </thead>
                <tbody>
                    {robots.map((robot) => (
                        <tr key={robot.id}>
                            <td colSpan="4">
                                <Link to={`/robots/${robot.id}`} className="robot-link">
                                    <div className="robot-row">
                                        <span>{robot.id}</span>
                                        <span>{robot.nombre}</span>
                                        <span>{robot.modelo}</span>
                                        <span>{robot.empresaFabricante}</span>
                                    </div>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tabla;