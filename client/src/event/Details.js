import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import UserContext from '../auth/User';
import formatDate from '../helpers/formatDate';
import eventType from '../helpers/eventType';
import eventsApi from '../apis/eventsApi';

import EventEdit from './Edit';
import EventDelete from './Delete';
import EventResult from './Result';

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

  return (
    <article>
      <h2>
        {event.name}
        {event.name && event.distance && ', '}
        {event.distance} {event.unit}
      </h2>

      <ul className="data-list">
        <li>{eventType[event.type]}</li>
        <li>{`${formatDate(event.date)}, ${event.time}`}</li>
        <li>
          {event.location}
          {event.location && event.city && ', '}
          {event.city}
        </li>
        {event.info && <li>{event.info}</li>}
        {event.homepage && (
          <li>
            <a href={event.homepage} target="_blank" rel="noreferrer">
              {event.homepage}
            </a>
          </li>
        )}
      </ul>

      {user.isLoggedIn && (
        <>
          <div className="buttons">
            <button type="button" onClick={() => setIsEditable(!isEditable)}>
              Redigera
            </button>

            <EventDelete eventId={id} />
          </div>

          {isEditable && <EventEdit event={event} />}
        </>
      )}

      {event.type === 'club' && <EventResult eventId={id} />}
    </article>
  );
};

export default EventDetails;
