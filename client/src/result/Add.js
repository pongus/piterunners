import { useEffect, useState } from 'react';
import { array, func, string } from 'prop-types';
import athletesApi from '../apis/athletesApi';
import resultsApi from '../apis/resultsApi';
import formatHours from '../helpers/formatHours';
import formatMinutesAndSeconds from '../helpers/formatMinutesAndSeconds';

const ResultAdd = ({ eventId: id, results, onAdd }) => {
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
        hours: formatHours(e.target.hours.value),
        minutes: formatMinutesAndSeconds(e.target.minutes.value),
        seconds: formatMinutesAndSeconds(e.target.seconds.value),
      })
      .then((response) => {
        if (response.status === 200) {
          e.target.reset();
          onAdd();
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
          required
        />
        <input
          type="text"
          id="minutes"
          name="minutes"
          placeholder="mm"
          maxLength="2"
          required
        />
        <input
          type="text"
          id="seconds"
          name="seconds"
          placeholder="ss"
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
  onAdd: func.isRequired,
  results: array,
};

ResultAdd.defaultValues = {
  results: [],
};

export default ResultAdd;
