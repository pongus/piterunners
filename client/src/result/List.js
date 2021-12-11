import { useState, useEffect, useContext } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

import athletesApi from '../apis/athletesApi';
import resultsApi from '../apis/resultsApi';

import ResultAdd from './Add';
import ResultDelete from './Delete';

import UserContext from '../auth/User';

const ResultList = ({ eventId: id }) => {
  const user = useContext(UserContext);
  const [athletes, setAthletes] = useState([]);
  const [results, setResults] = useState([]);

  const getAthletes = () => {
    athletesApi
      .get('/')
      .then((response) => {
        setAthletes(response.data.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const getResults = () => {
    resultsApi
      .get(`/event/${id}`)
      .then((response) => {
        setResults(response.data.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const getResultRow = (result) => (
    <tr key={result.id}>
      <td>{result.rank}</td>
      <td>
        <Link to={`/athletes/${result.athletes_id}`}>
          {getName(result.athletes_id).firstname}
        </Link>
      </td>
      <td>
        {' '}
        <Link to={`/athletes/${result.athletes_id}`}>
          {getName(result.athletes_id).lastname}
        </Link>
      </td>
      <td>
        {result.hours}:{result.minutes}:{result.seconds}
      </td>
      {user.isLoggedIn && (
        <td>
          <ResultDelete resultId={result.id} onSubmit={() => getResults()} />
        </td>
      )}
    </tr>
  );

  const getName = (id) => {
    const athlete = athletes?.find((athlete) => id === athlete.id);
    return {
      firstname: athlete?.firstname,
      lastname: athlete?.lastname,
    };
  };

  useEffect(() => {
    getAthletes();
    getResults();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {results.length > 0 && (
        <div>
          <h3>Resultat</h3>

          <div className="overflow-scroll">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Förnamn</th>
                  <th>Efternamn</th>
                  <th>Tid</th>
                  {user.isLoggedIn && <th></th>}
                </tr>
              </thead>

              <tbody>{results.map((result) => getResultRow(result))}</tbody>
            </table>
          </div>
        </div>
      )}

      {user.isLoggedIn && (
        <ResultAdd
          eventId={id}
          athletes={athletes}
          results={results}
          onSubmit={() => getResults()}
        />
      )}
    </div>
  );
};

ResultList.propTypes = {
  eventId: string.isRequired,
};

export default ResultList;
