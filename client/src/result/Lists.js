import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventsApi from '../apis/eventsApi';

const currentDate = new Date().toLocaleDateString('sv-SE');
const formatDate = (date) => new Date(date).toLocaleDateString('sv-SE');

const ResultLists = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    eventsApi
      .get('/')
      .then((response) => {
        setEvents(
          response.data.data.filter(
            (event) => event.date <= currentDate && event.type === 'club'
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setEvents]);

  const getFilter = () => (
    <div className="filter">
      <input
        type="text"
        placeholder="Filtrera på tävling eller distans"
        onChange={handleFilter}
      />
    </div>
  );

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase().trim());
  };

  const getResultRow = (event) => (
    <tr key={event.id}>
      <td>{formatDate(event.date)}</td>
      <td>
        <Link to={`events/${event.id}`}>{event.name} </Link>
      </td>
      <td>
        {event.distance} {event.unit}
      </td>
      <td>
        {event.location}, {event.city}
      </td>
    </tr>
  );

  return (
    <div>
      <h2>Resultat</h2>

      {getFilter()}

      <div className="overflow-scroll">
        <table>
          <thead>
            <tr>
              <th>Datum</th>
              <th>Tävling</th>
              <th>Distans</th>
              <th>Plats</th>
            </tr>
          </thead>

          <tbody>
            {events
              .filter(
                (event) =>
                  event.name.toLowerCase().includes(filter) ||
                  event.distance.toLowerCase().startsWith(filter)
              )
              .map((event) => getResultRow(event))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultLists;
