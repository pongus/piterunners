import { func, shape, string } from 'prop-types';

const AthleteForm = ({ values, onSubmit }) => {
  const { firstname, lastname, gender, dob, club } = values;

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        id="firstname"
        name="firstname"
        placeholder="Förnamn"
        defaultValue={firstname}
        required
      />
      <input
        type="text"
        id="lastname"
        name="lastname"
        placeholder="Efternamn"
        defaultValue={lastname}
        required
      />
      <select id="gender" name="gender" defaultValue={gender || ''}>
        <option value="" disabled>
          Kön
        </option>
        <option value="female">Kvinna</option>
        <option value="male">Man</option>
      </select>
      <input
        type="number"
        id="dob"
        name="dob"
        placeholder="Födelseår"
        min="1900"
        max="2020"
        defaultValue={dob}
      />
      <input
        type="text"
        id="club"
        name="club"
        placeholder="Klubb"
        defaultValue={club || 'Pite Runners LDK'}
      />
      <button type="submit">Spara löpare</button>
    </form>
  );
};

AthleteForm.propTypes = {
  values: shape({
    firstname: string,
    lastname: string,
    gender: string,
    dob: string,
    club: string,
  }),
  onSubmit: func.isRequired,
};

AthleteForm.defaultProps = {
  values: {},
};

export default AthleteForm;
