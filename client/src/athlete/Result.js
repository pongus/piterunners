import { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import resultsApi from '../apis/resultsApi';
import formatDate from '../helpers/formatDate';
import formatDistance from '../helpers/formatDistance';
import formatTime from '../helpers/formatTime';
import getPace from '../helpers/getPace';
import useSortTable from '../helpers/useSortTable';

const AthleteResults = ({ athleteId: id }) => {
  const [results, setResults] = useState([]);
  const { items, sortBy } = useSortTable(results);

  useEffect(() => {
    resultsApi(`/athlete/${id}`)
      .then((response) => {
        setResults(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, setResults]);

  return (
    results.length > 0 && (
      <div className="overflow-scroll">
        <table>
          <thead>
            <tr>
              <th className="sortable" onClick={() => sortBy('date')}>
                Datum
              </th>
              <th>Tävling</th>
              <th>Distans</th>
              <th>Tid</th>
              <th>Tempo</th>
            </tr>
          </thead>
          <tbody>
            {items.map((result) => {
              const {
                id,
                date,
                name,
                distance,
                unit,
                hours,
                minutes,
                seconds,
              } = result;

              return (
                <tr key={id}>
                  <td>{formatDate(date)}</td>
                  <td>
                    <Link to={`/events/${id}`}>{name}</Link>
                  </td>
                  <td>{formatDistance(distance, unit)}</td>
                  <td>{formatTime(hours, minutes, seconds)}</td>
                  <td>{getPace(hours, minutes, seconds, distance, unit)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
};

AthleteResults.propTypes = {
  athleteId: string.isRequired,
};

export default AthleteResults;
