import React, { useState } from 'react';
import { func } from 'prop-types';

const fakeUsername = 'admin';
const fakePassword = 'admin';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username && password) {
      onLogin(username === fakeUsername && password === fakePassword);
    }
  };

  return (
    <div>
      <h2>Logga in</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Användarnamn"
            autoComplete="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Lösenord"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">Logga in</button>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  onLogin: func.isRequired,
};

export default LoginPage;
