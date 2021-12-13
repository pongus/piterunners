import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventsApi from '../apis/eventsApi';
import currentDate from '../helpers/currentDate';
import formatDate from '../helpers/formatDate';
import Loader from '../common/Loader';

const ResultList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    eventsApi
      .get('/')
      .then((response) => {
        setResults(
          response.data.data.filter(
            (event) => event.date <= currentDate && event.type === 'club'
          )
        );
      })
      .then((data) => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [setResults]);

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
        <Link to={`events/${event.id}`}>{event.name}</Link>
      </td>
      <td>
        {event.distance} {event.distance && event.unit}
      </td>
      <td>
        {event.location}
        {event.location && event.city && ', '}
        {event.city}
      </td>
    </tr>
  );

  return (
    <article>
      <h2>Resultat</h2>

      <Loader isLoading={isLoading} />

      {results.length > 0 && (
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
                {results
                  .filter(
                    (event) =>
                      event.name.toLowerCase().includes(filter) ||
                      event.distance.toLowerCase().startsWith(filter)
                  )
                  .map((event) => getResultRow(event))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </article>
  );
};

export default ResultList;
