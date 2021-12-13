import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import resultsApi from '../apis/resultsApi';
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
            {results.map((result) => (
              <tr key={result.id}>
                <td>{new Date(result.date).toLocaleDateString('sv-SE')}</td>
                <td>
                  <Link to={`/events/${result.id}`}>{result.name}</Link>
                </td>
                <td>
                  {result.distance} {result.unit}
                </td>
                <td>
                  {result.hours}:{result.minutes}:{result.seconds}
                </td>
                <td>
                  {getPace(
                    result.hours,
                    result.minutes,
                    result.seconds,
                    result.distance
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

AthleteResults.propTypes = {
  athleteId: string.isRequired,
};

export default AthleteResults;
