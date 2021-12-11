import { useEffect, useState } from 'react';
import { array, string } from 'prop-types';
import athletesApi from '../apis/athletesApi';
import resultsApi from '../apis/resultsApi';

const ResultAdd = ({ eventId: id, results }) => {
  const [athletes, setAthletes] = useState([]);

  const addResult = (event) => {
    event.preventDefault();

    resultsApi
      .post('/', {
        events_id: parseInt(id),
        athletes_id: parseInt(event.target.athlete.value),
        hours: parseInt(event.target.hours.value) || 0,
        minutes: parseInt(event.target.minutes.value),
        seconds: parseInt(event.target.seconds.value),
      })
      .then((response) => {
        if (response.status === 200) {
          event.target.reset();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    athletesApi
      .get('/')
      .then((response) => {
        setAthletes(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setAthletes]);

  return (
    <div>
      <h3>Lägg till resultat</h3>

      <form onSubmit={addResult}>
        <div>
          <select
            id="athlete"
            name="athlete"
            defaultValue="placeholder"
            required
          >
            <option value="placeholder" disabled>
              Välj löpare
            </option>
            {athletes
              .filter((athlete) => {
                const resultIds = results.map((result) => result.athletes_id);
                return !resultIds.includes(athlete.id);
              })
              .map((athlete) => (
                <option key={athlete.id} value={athlete.id}>
                  {athlete.firstname} {athlete.lastname}
                </option>
              ))}
          </select>
          <input
            type="text"
            id="hours"
            name="hours"
            placeholder="hh"
            maxLength="2"
          />
          <input
            type="text"
            id="minutes"
            name="minutes"
            placeholder="mm"
            minLength="2"
            maxLength="2"
            required
          />
          <input
            type="text"
            id="seconds"
            name="seconds"
            placeholder="ss"
            minLength="2"
            maxLength="2"
            required
          />
          <button type="submit">Spara resultat</button>
        </div>
      </form>
    </div>
  );
};

ResultAdd.propTypes = {
  results: array,
  eventId: string.isRequired,
};

ResultAdd.defaultValues = {
  results: [],
};

export default ResultAdd;
