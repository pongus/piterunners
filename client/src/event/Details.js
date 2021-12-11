import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import UserContext from '../auth/User';
import EventForm from './Form';
import EventDelete from './Delete';
import ResultList from '../result/List';

import eventsApi from '../apis/eventsApi';
import eventType from '../helpers/eventType';

const formatDate = (date) => new Date(date).toLocaleDateString('sv-SE');

const EventDetails = () => {
  const { id } = useParams();
  const user = useContext(UserContext);
  const [event, setEvent] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    eventsApi
      .get(`/${id}`)
      .then((response) => {
        setEvent(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, setEvent]);

  const editEvent = (event) => {
    event.preventDefault();

    eventsApi
      .put(`/${id}`, {
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
          setIsEditable(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <article>
      <h2>
        {event.name}, {event.distance && `${event.distance} ${event.unit}`}
      </h2>

      <ul className="data-list">
        <li>{eventType[event.type]}</li>
        <li>
          {formatDate(event.date)}, {event.time}
        </li>
        <li>
          {event.location}, {event.city}
        </li>
        {event.info && <li>{event.info}</li>}
        {event.homepage && (
          <li>
            <a href={event.homepage} target="blank" rel="noreferrer">
              {event.homepage}
            </a>
          </li>
        )}
      </ul>

      {user.isLoggedIn && (
        <div className="buttons">
          <button type="button" onClick={() => setIsEditable(!isEditable)}>
            Redigera
          </button>

          <EventDelete eventId={id} />
        </div>
      )}

      {isEditable && (
        <>
          <h3>Redigera</h3>

          <EventForm
            values={{
              name: event.name,
              type: event.type,
              date: formatDate(event.date),
              time: event.time,
              location: event.location,
              city: event.city,
              distance: event.distance,
              unit: event.unit,
              info: event.info,
              homepage: event.homepage,
            }}
            onSubmit={editEvent}
          />
        </>
      )}

      {event.type === 'club' && <ResultList eventId={id} />}
    </article>
  );
};

export default EventDetails;
