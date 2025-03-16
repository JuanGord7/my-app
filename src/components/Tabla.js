import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import 'bootstrap/dist/css/bootstrap.min.css';

function Tabla() {
  const [robots, setRobots] = useState([]);
  const intl = useIntl();

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
      <table className="table">
        <thead className="table-dark text-start">
          <tr>
            <th scope="col">{intl.formatMessage({ id: 'table.header.id' })}</th>
            <th scope="col">{intl.formatMessage({ id: 'table.header.name' })}</th>
            <th scope="col">{intl.formatMessage({ id: 'table.header.model' })}</th>
            <th scope="col">{intl.formatMessage({ id: 'table.header.manufacturer' })}</th>
          </tr>
        </thead>
        <tbody className="text-start">
          {robots.map((robot) => (
            <tr key={robot.id}>
              <td>
                <Link to={`/robots/${robot.id}`} className="robot-link">
                  {robot.id}
                </Link>
              </td>
              <td>
                <Link to={`/robots/${robot.id}`} className="robot-link">
                  {robot.nombre}
                </Link>
              </td>
              <td>
                <Link to={`/robots/${robot.id}`} className="robot-link">
                  {robot.modelo}
                </Link>
              </td>
              <td>
                <Link to={`/robots/${robot.id}`} className="robot-link">
                  {robot.empresaFabricante}
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