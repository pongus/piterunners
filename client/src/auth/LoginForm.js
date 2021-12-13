import { useState } from 'react';
import { func } from 'prop-types';

const fakeUsername = 'admin';
const fakePassword = 'admin';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      onLogin(username === fakeUsername && password === fakePassword);
    }
  };

  return (
    <article>
      <h2>Logga in</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Användarnamn"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Lösenord"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Logga in</button>
      </form>
    </article>
  );
};

LoginPage.propTypes = {
  onLogin: func.isRequired,
};

export default LoginPage;
