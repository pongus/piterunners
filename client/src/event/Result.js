import { useState, useEffect, useContext } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

import UserContext from '../auth/User';
import resultsApi from '../apis/resultsApi';

import ResultAdd from '../result/Add';
import ResultDelete from '../result/Delete';

const EventResult = ({ eventId: id }) => {
  const user = useContext(UserContext);
  const [results, setResults] = useState([]);

  useEffect(() => {
    resultsApi
      .get(`/event/${id}`)
      .then((response) => {
        setResults(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, setResults]);

  const getResultRow = (result) => (
    <tr key={result.id}>
      <td>{result.rank}</td>
      <td>
        <Link to={`/athletes/${result.athletes_id}`}>{result.firstname}</Link>
      </td>
      <td>
        <Link to={`/athletes/${result.athletes_id}`}>{result.lastname}</Link>
      </td>
      <td>
        {result.hours}:{result.minutes}:{result.seconds}
      </td>
      {user.isLoggedIn && (
        <td>
          <ResultDelete resultId={result.id} />
        </td>
      )}
    </tr>
  );

  return (
    <div>
      {user.isLoggedIn && <ResultAdd eventId={id} results={results} />}

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
    </div>
  );
};

EventResult.propTypes = {
  eventId: string.isRequired,
};

export default EventResult;
