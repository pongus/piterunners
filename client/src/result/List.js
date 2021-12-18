import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import resultsApi from '../apis/resultsApi';
import formatDate from '../helpers/formatDate';
import formatDistance from '../helpers/formatDistance';
import useSortTable from '../helpers/useSortTable';
import Loader from '../common/Loader';

const ResultList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('');
  const { items, sortBy } = useSortTable(results);

  useEffect(() => {
    resultsApi
      .get('/')
      .then((response) => {
        setResults(response.data.data);
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
        onChange={(event) => setFilter(event.target.value.toLowerCase().trim())}
      />
    </div>
  );

  const getResultRow = (event) => (
    <tr key={event.id}>
      <td>{formatDate(event.date)}</td>
      <td>
        <Link to={`events/${event.id}`}>{event.name}</Link>
      </td>
      <td>{formatDistance(event.distance, event.unit)}</td>
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
                  <th className="sortable" onClick={() => sortBy('date')}>
                    Datum
                  </th>
                  <th>Tävling</th>
                  <th>Distans</th>
                  <th>Plats</th>
                </tr>
              </thead>

              <tbody>
                {items
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
