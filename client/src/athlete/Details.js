import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import UserContext from '../auth/User';
import athletesApi from '../apis/athletesApi';

import AthleteEdit from './Edit';
import AthleteDelete from './Delete';
import AthleteResult from './Result';

const AthleteDetails = () => {
  const { id } = useParams();
  const user = useContext(UserContext);
  const [athlete, setAthlete] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    athletesApi
      .get(`/${id}`)
      .then((response) => {
        setAthlete(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, setAthlete]);

  return (
    athlete && (
      <article>
        <h2>
          {athlete.firstname} {athlete.lastname}
        </h2>

        {user.isLoggedIn && (
          <>
            <div className="buttons">
              <button type="button" onClick={() => setIsEditable(!isEditable)}>
                Redigera
              </button>

              <AthleteDelete athleteId={id} />
            </div>

            {isEditable && <AthleteEdit athlete={athlete} />}
          </>
        )}

        <AthleteResult athleteId={id} />
      </article>
    )
  );
};

export default AthleteDetails;
