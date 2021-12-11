import { number } from 'prop-types';
import resultsApi from '../apis/resultsApi';

const ResultDelete = ({ resultId: id }) => {
  const deleteResult = () => {
    resultsApi.delete(`/${id}`).catch((error) => {
      console.error(error);
    });
  };

  return (
    <button type="button" onClick={deleteResult}>
      Ta bort
    </button>
  );
};

ResultDelete.propTypes = {
  resultId: number.isRequired,
};

export default ResultDelete;
