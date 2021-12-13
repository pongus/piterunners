import { number, shape, string } from 'prop-types';
import formatDate from '../helpers/formatDate';
import eventsApi from '../apis/eventsApi';
import EventForm from './Form';

const EventEdit = ({ event }) => {
  const {
    id,
    name,
    type,
    date,
    time,
    location,
    city,
    distance,
    unit,
    info,
    homepage,
  } = event;

  const editEvent = (e) => {
    e.preventDefault();

    eventsApi
      .put(`/${id}`, {
        name: e.target.name.value,
        type: e.target.type.value,
        date: e.target.date.value,
        time: e.target.time.value,
        location: e.target.location.value,
        city: e.target.city.value,
        distance: e.target.distance.value,
        unit: e.target.unit.value,
        info: e.target.info.value,
        homepage: e.target.homepage.value,
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h3>Redigera</h3>

      <EventForm
        values={{
          name,
          type,
          date: formatDate(date),
          time,
          location,
          city,
          distance,
          unit,
          info,
          homepage,
        }}
        onSubmit={editEvent}
      />
    </>
  );
};

EventEdit.propTypes = {
  event: shape({
    id: number.isRequired,
    name: string.isRequired,
    type: string,
    date: string,
    time: string,
    location: string,
    city: string,
    distance: string,
    unit: string,
    info: string,
    homepage: string,
  }),
};

export default EventEdit;
