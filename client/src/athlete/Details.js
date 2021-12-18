import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import athletesApi from '../apis/athletesApi';
import UserContext from '../auth/User';
import Loader from '../common/Loader';

import AthleteEdit from './Edit';
import AthleteDelete from './Delete';
import AthleteResult from './Result';

const AthleteDetails = () => {
  const { id } = useParams();
  const user = useContext(UserContext);
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [athlete, setAthlete] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    athletesApi
      .get(`/${id}`)
      .then((response) => {
        setAthlete(response.data.data);
      })
      .then((data) => {
        setIsLoading(false);
        setIsEditable(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, key, setAthlete]);

  return (
    <article>
      <Loader isLoading={isLoading} />

      {athlete && (
        <>
          <h2>
            {athlete.firstname} {athlete.lastname}
          </h2>

          {user.isLoggedIn && (
            <>
              <div className="buttons">
                <button
                  type="button"
                  onClick={() => setIsEditable(!isEditable)}
                >
                  Redigera
                </button>

                <AthleteDelete athleteId={id} />
              </div>

              {isEditable && (
                <AthleteEdit
                  athlete={athlete}
                  onEdit={() => setKey((key) => key + 1)}
                />
              )}
            </>
          )}

          <AthleteResult athleteId={id} />
        </>
      )}
    </article>
  );
};

export default AthleteDetails;
