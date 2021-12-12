import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import athletesApi from '../apis/athletesApi';
import Loader from '../common/Loader';

const AthleteList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [athletes, setAthletes] = useState([]);
  const [filter, setFilter] = useState('');

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
      });
  }, [setAthletes]);

  const getFilter = () => (
    <div className="filter">
      <input
        type="text"
        placeholder="Filtrera på förnamn eller efternamn"
        onChange={handleFilter}
      />
    </div>
  );

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase().trim());
  };

  const getAthleteRow = (athlete) => (
    <tr key={athlete.id}>
      <td>
        <Link to={`athletes/${athlete.id}`}>{athlete.firstname}</Link>
      </td>
      <td>
        <Link to={`athletes/${athlete.id}`}>{athlete.lastname}</Link>
      </td>
      <td>{athlete.dob}</td>
      <td>{athlete.club}</td>
    </tr>
  );

  return (
    <div>
      <h2>Löpare</h2>

      <Loader isLoading={isLoading} />

      {athletes.length > 0 && (
        <>
          {getFilter()}

          <div className="overflow-scroll">
            <table>
              <thead>
                <tr>
                  <th>Förnamn</th>
                  <th>Efternamn</th>
                  <th>Födelseår</th>
                  <th>Klubb</th>
                </tr>
              </thead>
              <tbody>
                {athletes
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
    </div>
  );
};

export default AthleteList;
