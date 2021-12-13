import { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import resultsApi from '../apis/resultsApi';
import formatDate from '../helpers/formatDate';
import getPace from '../helpers/getPace';
import Loader from '../common/Loader';

const AthleteResults = ({ athleteId: id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    resultsApi(`/athlete/${id}`)
      .then((response) => {
        setResults(response.data.data);
      })
      .then((data) => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, setResults]);

  return (
    <>
      <Loader isLoading={isLoading} />

      {results.length > 0 && (
        <div className="overflow-scroll">
          <table>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Tävling</th>
                <th>Distans</th>
                <th>Tid</th>
                <th>Tempo</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => {
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
                    <td>
                      {distance} {unit}
                    </td>
                    <td>
                      {hours}:{minutes}:{seconds}
                    </td>
                    <td>{getPace(hours, minutes, seconds, distance, unit)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

AthleteResults.propTypes = {
  athleteId: string.isRequired,
};

export default AthleteResults;
