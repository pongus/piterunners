import { useState, useEffect, useContext } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

import UserContext from '../auth/User';
import resultsApi from '../apis/resultsApi';
import formatTime from '../helpers/formatTime';
import useSortTable from '../helpers/useSortTable';

import ResultAdd from '../result/Add';
import ResultDelete from '../result/Delete';

const zero = (value) => {
  let time = parseInt(value);
  time = time >= 10 ? time : '0' + time;
  return time.toString();
};

const EventResult = ({ eventId: id }) => {
  const user = useContext(UserContext);
  const [key, setKey] = useState(0);
  const [results, setResults] = useState([]);
  const { items, sortBy } = useSortTable(results);

  useEffect(() => {
    resultsApi
      .get(`/event/${id}`)
      .then((response) => {
        setResults(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, key, setResults]);

  const getTimeBehind = (hours, minutes, seconds) => {
    if (hours === '99') {
      return 'DNF';
    }

    const bestTime = new Date(
      0,
      0,
      0,
      parseInt(results[0]?.hours + 1),
      parseInt(results[0]?.minutes),
      parseInt(results[0]?.seconds)
    );

    const currentTime = new Date(
      0,
      0,
      0,
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds)
    );

    const diff = new Date(currentTime - bestTime);

    return `${diff.getHours()}:${zero(diff.getMinutes())}:${zero(
      diff.getSeconds()
    )}`;
  };

  const getResultRow = (result) => {
    const {
      id,
      athletes_id,
      firstname,
      lastname,
      rank,
      hours,
      minutes,
      seconds,
    } = result;

    return (
      <tr key={id}>
        <td>{rank}</td>
        <td>
          <Link to={`/athletes/${athletes_id}`}>{firstname}</Link>
        </td>
        <td>
          <Link to={`/athletes/${athletes_id}`}>{lastname}</Link>
        </td>
        <td>{formatTime(hours, minutes, seconds)}</td>
        <td>{getTimeBehind(hours, minutes, seconds)}</td>
        {user.isLoggedIn && (
          <td>
            <ResultDelete
              resultId={id}
              onDelete={() => setKey((key) => key + 1)}
            />
          </td>
        )}
      </tr>
    );
  };

  return (
    <div>
      {user.isLoggedIn && (
        <ResultAdd
          eventId={id}
          results={results}
          onAdd={() => setKey((key) => key + 1)}
        />
      )}

      {results.length > 0 && (
        <div className="overflow-scroll">
          <table>
            <thead>
              <tr>
                <th className="sortable" onClick={() => sortBy('rank')}>
                  #
                </th>
                <th>Förnamn</th>
                <th>Efternamn</th>
                <th>Tid</th>
                <th>Diff</th>
                {user.isLoggedIn && <th></th>}
              </tr>
            </thead>
            <tbody>{items.map((result) => getResultRow(result))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

EventResult.propTypes = {
  eventId: string.isRequired,
};

export default EventResult;
