import { func, number } from 'prop-types';
import resultsApi from '../apis/resultsApi';

const ResultDelete = ({ resultId: id, onSubmit }) => {
  const deleteResult = () => {
    resultsApi
      .delete(`/${id}`)
      .then(() => {
        onSubmit();
      })
      .catch((error) => {
        console.error('Error', error);
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
  onSubmit: func.isRequired,
};

export default ResultDelete;
