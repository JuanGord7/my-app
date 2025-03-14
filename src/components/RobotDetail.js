import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function RobotDetail() {
    const { robotId } = useParams();
    const [robot, setRobot] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRobot = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/robots/${robotId}`);
                setRobot(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('The robot with the given id was not found.');
                } else {
                    console.log(error);
                }
            }
        };

        fetchRobot();
    }, [robotId]);

    if (error) {
        return <div className="container"><p>{error}</p></div>;
    }

    if (!robot) {
        return <div className="container"><p>Loading...</p></div>;
    }

    return (
        <div className="container detail-container">
            <h2>Detalle del Robot</h2>
            <img src={robot.imagen} alt={robot.nombre} className="img-fluid" />
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{robot.id}</td>
                    </tr>
                    <tr>
                        <th>Nombre</th>
                        <td>{robot.nombre}</td>
                    </tr>
                    <tr>
                        <th>Modelo</th>
                        <td>{robot.modelo}</td>
                    </tr>
                    <tr>
                        <th>Empresa Fabricante</th>
                        <td>{robot.empresaFabricante}</td>
                    </tr>
                    <tr>
                        <th>Año de Fabricación</th>
                        <td>{robot.añoFabricacion}</td>
                    </tr>
                    <tr>
                        <th>Capacidad de Procesamiento</th>
                        <td>{robot.capacidadProcesamiento}</td>
                    </tr>
                    <tr>
                        <th>Humor</th>
                        <td>{robot.humor}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default RobotDetail;