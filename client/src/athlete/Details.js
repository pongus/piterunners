import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../auth/User';
import AthleteForm from './Form';
import AthleteResults from './Results';
import athletesApi from '../apis/athletesApi';

const AthleteDetails = () => {
  const { id } = useParams();
  const user = useContext(UserContext);
  const [athlete, setAthlete] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  const editAthlete = (event) => {
    event.preventDefault();

    athletesApi
      .put(`/${id}`, {
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        gender: event.target.gender.value,
        dob: event.target.dob.value,
        club: event.target.club.value,
      })
      .then((response) => {
        if (response.status === 200) {
          setIsEditable(false);
        }
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const deleteAthlete = () => {
    athletesApi
      .delete(`/${id}`)
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '/athletes';
        }
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  useEffect(() => {
    athletesApi
      .get(`/${id}`)
      .then((response) => {
        setAthlete(response.data.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [id, setAthlete]);

  return (
    <div>
      <h2>
        {athlete.firstname} {athlete.lastname}
      </h2>

      {user.isLoggedIn && (
        <div className="buttons">
          <button type="button" onClick={() => setIsEditable(!isEditable)}>
            Redigera
          </button>

          <button type="button" onClick={() => deleteAthlete()}>
            Ta bort
          </button>
        </div>
      )}

      {isEditable && (
        <>
          <h3>Redigera</h3>

          <AthleteForm
            values={{
              firstname: athlete.firstname,
              lastname: athlete.lastname,
              gender: athlete.gender,
              dob: athlete.dob,
              club: athlete.club,
            }}
            onSubmit={editAthlete}
          />
        </>
      )}

      <AthleteResults athleteId={id} />
    </div>
  );
};

export default AthleteDetails;
