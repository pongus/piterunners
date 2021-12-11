import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventsApi from '../apis/eventsApi';
import eventType from '../helpers/eventType';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const currentDate = new Date().toLocaleDateString('sv-SE');
  const formatDate = (date) => new Date(date).toLocaleDateString('sv-SE');

  const getTypes = () => {
    const types = [];

    events.map((event) => {
      if (!types.includes(event.type)) {
        types.push(event.type);
      }

      return event;
    });

    return types;
  };

  const getEventRow = ({ id, date, name, location, city, distance, unit }) => (
    <tr key={id}>
      <td>{formatDate(date)}</td>
      <td>
        <Link to={`events/${id}`}>{name}</Link>
      </td>
      <td>
        {distance} {unit}
      </td>
      <td>
        {location}, {city}
      </td>
    </tr>
  );

  const getFilter = () =>
    getTypes().length > 1 && (
      <div className="filter">
        <select name="filter" defaultValue="all" onChange={handleFilter}>
          <option key="all" value="all">
            Filtrera på tävlingstyp
          </option>
          {getTypes().map((type) => (
            <option key={type} value={type}>
              {eventType[type]}
            </option>
          ))}
        </select>
      </div>
    );

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    eventsApi
      .get('/')
      .then((response) => {
        setEvents(response.data.data.filter(({ date }) => date >= currentDate));
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [setEvents, currentDate]);

  return (
    <article>
      <h2>Tävlingar</h2>

      {events.length > 0 && (
        <>
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
                  .filter((event) => filter === 'all' || filter === event.type)
                  .map((event) => getEventRow(event))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </article>
  );
};

export default EventList;
