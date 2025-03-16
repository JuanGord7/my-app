import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RobotDetail.css';

function RobotDetail() {
    const { robotId } = useParams();
    const [robot, setRobot] = useState(null);
    const [error, setError] = useState('');
    const intl = useIntl();

    const getRawUrl = (url) => {
        if (url.includes('github.com') && url.includes('blob')) {
          return url.replace('https://github.com/', 'https://raw.githubusercontent.com/').replace('/blob/', '/');
        }
        return url;
    };

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
            <div className="robot-card">
                <h2 className="robot-name">{robot.nombre}</h2>
                <img src={getRawUrl(robot.imagen)} alt={robot.nombre} className="robot-image" />
                <div className="robot-attribute">
                    <span className="arrow">➔</span> <strong>{intl.formatMessage({ id: 'robot.detail.year' })}:</strong> {robot.añoFabricacion}
                </div>
                <div className="robot-attribute">
                    <span className="arrow">➔</span> <strong>{intl.formatMessage({ id: 'robot.detail.processing' })}:</strong> {robot.capacidadProcesamiento}
                </div>
                <div className="robot-attribute">
                    <span className="arrow">➔</span> <strong>{intl.formatMessage({ id: 'robot.detail.humor' })}:</strong> {robot.humor}
                </div>
            </div>
        </div>
    );
}

export default RobotDetail;