import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventsApi from '../apis/eventsApi';
import eventType from '../helpers/eventType';
import currentDate from '../helpers/currentDate';
import formatDate from '../helpers/formatDate';
import formatDistance from '../helpers/formatDistance';
import Loader from '../common/Loader';

const EventList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    eventsApi
      .get('/')
      .then((response) => {
        setEvents(response.data.data.filter(({ date }) => date >= currentDate));
      })
      .then((data) => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [setEvents]);

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

  const getEventRow = ({ id, date, name, location, city, distance, unit }) => (
    <tr key={id}>
      <td>{date && formatDate(date)}</td>
      <td>
        <Link to={`events/${id}`}>{name}</Link>
      </td>
      <td>{formatDistance(distance, unit)}</td>
      <td>
        {location}
        {location && city && ', '}
        {city}
      </td>
    </tr>
  );

  return (
    <article>
      <h2>Tävlingar</h2>

      <Loader isLoading={isLoading} />

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
