import { string } from 'prop-types';
import eventsApi from '../apis/eventsApi';

const EventDelete = ({ eventId: id }) => {
  const deleteEvent = () => {
    eventsApi
      .delete(`/${id}`)
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '/events';
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <button type="button" onClick={deleteEvent}>
      Ta bort
    </button>
  );
};

EventDelete.propTypes = {
  eventId: string.isRequired,
};

export default EventDelete;
