import { string } from 'prop-types';
import athletesApi from '../apis/athletesApi';

const AthleteDelete = ({ athleteId: id }) => {
  const deleteAthlete = () => {
    athletesApi
      .delete(`/${id}`)
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '/athletes';
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <button type="button" onClick={() => deleteAthlete()}>
      Ta bort
    </button>
  );
};

AthleteDelete.propTypes = {
  athleteId: string.isRequired,
};

export default AthleteDelete;
