import { func, number } from 'prop-types';
import resultsApi from '../apis/resultsApi';

const ResultDelete = ({ resultId: id, onDelete }) => {
  const deleteResult = () => {
    resultsApi
      .delete(`/${id}`)
      .then(() => {
        onDelete();
      })
      .catch((error) => {
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
  onDelete: func.isRequired,
  resultId: number.isRequired,
};

export default ResultDelete;
