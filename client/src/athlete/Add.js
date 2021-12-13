import athletesApi from '../apis/athletesApi';
import AthleteForm from './Form';

const AthleteAdd = () => {
  const addAthlete = (e) => {
    e.preventDefault();

    athletesApi
      .post('/', {
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
        gender: e.target.gender.value,
        dob: e.target.dob.value,
        club: e.target.club.value,
      })
      .then((response) => {
        if (response.status === 200) {
          e.target.reset();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <article>
      <h2>Skapa löpare</h2>

      <AthleteForm onSubmit={addAthlete} />
    </article>
  );
};

export default AthleteAdd;
