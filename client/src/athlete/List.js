import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import athletesApi from '../apis/athletesApi';
import useSortTable from '../helpers/useSortTable';
import Loader from '../common/Loader';

const AthleteList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [athletes, setAthletes] = useState([]);
  const [filter, setFilter] = useState('');
  const { items, sortBy } = useSortTable(athletes);

  useEffect(() => {
    athletesApi
      .get('/')
      .then((response) => {
        setAthletes(response.data.data);
      })
      .then((data) => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [setAthletes]);

  const getFilter = () => (
    <div className="filter">
      <input
        type="text"
        placeholder="Filtrera på förnamn eller efternamn"
        onChange={(event) => setFilter(event.target.value.toLowerCase().trim())}
      />
    </div>
  );

  const getAthleteRow = (athlete) => (
    <tr key={athlete.id}>
      <td>
        <Link to={`athletes/${athlete.id}`}>{athlete.firstname}</Link>
      </td>
      <td>
        <Link to={`athletes/${athlete.id}`}>{athlete.lastname}</Link>
      </td>
      <td>{athlete.club}</td>
    </tr>
  );

  return (
    <article>
      <h2>Löpare</h2>

      <Loader isLoading={isLoading} />

      {athletes.length > 0 && (
        <>
          {getFilter()}

          <div className="overflow-scroll">
            <table>
              <thead>
                <tr>
                  <th className="sortable" onClick={() => sortBy('firstname')}>
                    Förnamn
                  </th>
                  <th>Efternamn</th>
                  <th>Klubb</th>
                </tr>
              </thead>
              <tbody>
                {items
                  .filter(
                    (athlete) =>
                      athlete.firstname.toLowerCase().includes(filter) ||
                      athlete.lastname.toLowerCase().includes(filter)
                  )
                  .map((athlete) => getAthleteRow(athlete))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </article>
  );
};

export default AthleteList;
