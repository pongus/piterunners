import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/User';

const MainMenu = () => {
  const user = useContext(UserContext);

  return (
    <div>
      <h2 className="sr-only">Meny</h2>
      <ul className="menu">
        <li>
          <Link to="/events">Tävlingar</Link>
        </li>
        <li>
          <Link to="/results">Resultat</Link>
        </li>
        <li>
          <Link to="/athletes">Löpare</Link>
        </li>
        {user.isLoggedIn ? (
          <>
            <li>
              <Link to="/events/add">Skapa tävlingar</Link>
            </li>
            <li>
              <Link to="/athletes/add">Skapa löpare</Link>
            </li>
            <li>
              <Link to="/logout">Logga ut</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Logga in</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MainMenu;
