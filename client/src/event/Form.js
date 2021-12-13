import { func, shape, string } from 'prop-types';

const EventForm = ({ values, onSubmit }) => {
  const {
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
  } = values;

  return (
    <form onSubmit={onSubmit}>
      <input name="name" placeholder="Namn" defaultValue={name} required />
      <select name="type" defaultValue={type}>
        <option value="club">Klubbtävling</option>
        <option value="local">Närtävling</option>
        <option value="regional">Distrikstävling</option>
        <option value="national">Nationell tävling</option>
      </select>
      <input type="date" name="date" placeholder="Datum" defaultValue={date} />
      <input type="time" name="time" placeholder="Tid" defaultValue={time} />
      <input name="location" placeholder="Plats" defaultValue={location} />
      <input name="city" placeholder="Stad" defaultValue={city} />
      <input name="distance" placeholder="Distans" defaultValue={distance} />
      <select id="unit" name="unit" defaultValue={unit}>
        <option value="km">km (landsväg)</option>
        <option value="m">m (löparbana)</option>
      </select>
      <textarea
        name="info"
        rows="5"
        cols="50"
        placeholder="Information"
        defaultValue={info}
      />
      <input name="homepage" placeholder="Hemsida" defaultValue={homepage} />
      <button type="submit">Spara tävling</button>
    </form>
  );
};

EventForm.propTypes = {
  onSubmit: func.isRequired,
  values: shape({
    name: string,
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

EventForm.defaultProps = {
  values: {},
};

export default EventForm;
