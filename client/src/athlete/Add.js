import React from 'react';
import AthleteForm from './Form';
import athletesApi from '../apis/athletesApi';

const AthleteAdd = () => {
  const addAthlete = (event) => {
    event.preventDefault();

    athletesApi
      .post('/', {
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        gender: event.target.gender.value,
        dob: event.target.dob.value,
        club: event.target.club.value,
      })
      .then((response) => {
        if (response.status === 200) {
          event.target.reset();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Skapa löpare</h2>

      <AthleteForm onSubmit={addAthlete} />
    </div>
  );
};

export default AthleteAdd;
