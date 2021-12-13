import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import './App.css';

// Common
import MainMenu from './common/MainMenu';
import SocialMenu from './common/SocialMenu';

// Auth
import UserContext from './auth/User';
import LoginForm from './auth/LoginForm';
import LogoutForm from './auth/LogoutForm';

// Athletes
import AthleteList from './athlete/List';
import AthleteDetails from './athlete/Details';
import AthleteAdd from './athlete/Add';

// Events
import EventList from './event/List';
import EventDetails from './event/Details';
import EventAdd from './event/Add';

// Results
import ResultList from './result/List';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = {
    isLoggedIn: isLoggedIn,
  };

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Router>
          <header className="App-header">
            <div className="logo" title="Tillbaka till startsidan">
              <Link to="/">
                <span className="sr-only">Pite Runners</span>
              </Link>
            </div>

            <MainMenu />
          </header>

          <main className="App-main">
            <Switch>
              <Route path="/events/add">
                {user.isLoggedIn ? <EventAdd /> : <Redirect to="/login" />}
              </Route>
              <Route path="/events/:id">
                <EventDetails />
              </Route>
              <Route path="/events">
                <EventList />
              </Route>
              <Route path="/results">
                <ResultList />
              </Route>
              <Route path="/athletes/add">
                {user.isLoggedIn ? <AthleteAdd /> : <Redirect to="/login" />}
              </Route>
              <Route path="/athletes/:id">
                <AthleteDetails />
              </Route>
              <Route path="/athletes">
                <AthleteList />
              </Route>
              <Route path="/login">
                {!user.isLoggedIn ? (
                  <LoginForm onLogin={(value) => setIsLoggedIn(value)} />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>
              <Route path="/logout">
                {user.isLoggedIn ? (
                  <LogoutForm onLogout={(value) => setIsLoggedIn(value)} />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>
              <Route path="/">
                <EventList />
              </Route>
            </Switch>
          </main>

          <footer className="App-footer">
            <SocialMenu />
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;
