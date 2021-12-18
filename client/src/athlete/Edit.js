import { func, number, shape, string } from 'prop-types';
import athletesApi from '../apis/athletesApi';
import AthleteForm from './Form';

const AthleteEdit = ({ athlete, onEdit }) => {
  const { id, firstname, lastname, gender, dob, club } = athlete;

  const editAthlete = (e) => {
    e.preventDefault();

    athletesApi
      .put(`/${id}`, {
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
        gender: e.target.gender.value,
        dob: e.target.dob.value,
        club: e.target.club.value,
      })
      .then(() => {
        onEdit();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h3>Redigera</h3>

      <AthleteForm
        values={{ firstname, lastname, gender, dob, club }}
        onSubmit={editAthlete}
      />
    </>
  );
};

AthleteEdit.propTypes = {
  athlete: shape({
    id: number.isRequired,
    firstname: string.isRequired,
    lastname: string.isRequired,
    gender: string,
    dob: string,
    club: string,
  }),
  onEdit: func.isRequired,
};

export default AthleteEdit;
