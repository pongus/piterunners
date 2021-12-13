import { useEffect, useState } from 'react';
import { array, string } from 'prop-types';
import athletesApi from '../apis/athletesApi';
import resultsApi from '../apis/resultsApi';

const ResultAdd = ({ eventId: id, results }) => {
  const [athletes, setAthletes] = useState([]);

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

  const addResult = (e) => {
    e.preventDefault();

    resultsApi
      .post('/', {
        events_id: parseInt(id),
        athletes_id: parseInt(e.target.athlete.value),
        hours: e.target.hours.value || '0',
        minutes: e.target.minutes.value,
        seconds: e.target.seconds.value,
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
    <div>
      <h3>Lägg till resultat</h3>

      <form onSubmit={addResult}>
        <select id="athlete" name="athlete" defaultValue="placeholder" required>
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
      </form>
    </div>
  );
};

ResultAdd.propTypes = {
  eventId: string.isRequired,
  results: array,
};

ResultAdd.defaultValues = {
  results: [],
};

export default ResultAdd;
