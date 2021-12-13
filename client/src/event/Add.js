import eventsApi from '../apis/eventsApi';
import EventForm from './Form';

const EventAdd = () => {
  const addEvent = (e) => {
    e.preventDefault();

    eventsApi
      .post('/', {
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
      <h2>Skapa tävling</h2>

      <EventForm onSubmit={addEvent} />
    </article>
  );
};

export default EventAdd;
