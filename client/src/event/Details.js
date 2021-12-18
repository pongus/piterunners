import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import eventsApi from '../apis/eventsApi';
import UserContext from '../auth/User';
import formatDate from '../helpers/formatDate';
import formatDistance from '../helpers/formatDistance';
import eventType from '../helpers/eventType';
import Loader from '../common/Loader';

import EventEdit from './Edit';
import EventDelete from './Delete';
import EventResult from './Result';

const EventDetails = () => {
  const { id } = useParams();
  const user = useContext(UserContext);
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    eventsApi
      .get(`/${id}`)
      .then((response) => {
        setEvent(response.data.data);
      })
      .then((data) => {
        setIsLoading(false);
        setIsEditable(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, key, setEvent]);

  return (
    <article>
      <Loader isLoading={isLoading} />

      {event && (
        <>
          <h2>
            {event.name}
            {event.name && event.distance && ', '}
            {formatDistance(event.distance, event.unit)}
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
                <button
                  type="button"
                  onClick={() => setIsEditable(!isEditable)}
                >
                  Redigera
                </button>

                <EventDelete eventId={id} />
              </div>

              {isEditable && (
                <EventEdit
                  event={event}
                  onEdit={() => setKey((key) => key + 1)}
                />
              )}
            </>
          )}

          {event.type === 'club' && <EventResult eventId={id} />}
        </>
      )}
    </article>
  );
};

export default EventDetails;
