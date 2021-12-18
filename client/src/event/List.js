import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventsApi from '../apis/eventsApi';
import eventType from '../helpers/eventType';
import formatDate from '../helpers/formatDate';
import formatDistance from '../helpers/formatDistance';
import useSortTable from '../helpers/useSortTable';
import Loader from '../common/Loader';

const EventList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [events, setEvents] = useState([]);
  const { items, sortBy } = useSortTable(events);

  useEffect(() => {
    eventsApi
      .get('/')
      .then((response) => {
        setEvents(response.data.data);
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
        <select
          name="filter"
          defaultValue="all"
          onChange={(event) => setFilter(event.target.value)}
        >
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

  const getEventRow = ({
    id,
    date,
    type,
    name,
    location,
    city,
    distance,
    unit,
  }) => (
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
      <td>{eventType[type]}</td>
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
                  <th className="sortable" onClick={() => sortBy('date')}>
                    Datum
                  </th>
                  <th>Tävling</th>
                  <th>Distans</th>
                  <th>Plats</th>
                  <th>Typ</th>
                </tr>
              </thead>

              <tbody>
                {items
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
