import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import athletesApi from '../apis/athletesApi';

const AthleteList = () => {
  const [athletes, setAthletes] = useState([]);
  const [filter, setFilter] = useState('');

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

  useEffect(() => {
    athletesApi
      .get('/')
      .then((response) => {
        setAthletes(response.data.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [setAthletes]);

  return (
    <div>
      <h2>Löpare</h2>

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
    </div>
  );
};

export default AthleteList;
