import React from 'react';
import eventsApi from '../apis/eventsApi';
import EventForm from './Form';

const EventAdd = () => {
  const addEvent = (event) => {
    event.preventDefault();

    eventsApi
      .post('/', {
        name: event.target.name.value,
        type: event.target.type.value,
        date: event.target.date.value,
        time: event.target.time.value,
        location: event.target.location.value,
        city: event.target.city.value,
        distance: event.target.distance.value,
        unit: event.target.unit.value,
        info: event.target.info.value,
        homepage: event.target.homepage.value,
      })
      .then((response) => {
        if (response.status === 200) {
          event.target.reset();
        }
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  return (
    <div>
      <h2>Skapa tävling</h2>

      <EventForm onSubmit={addEvent} />
    </div>
  );
};

export default EventAdd;
