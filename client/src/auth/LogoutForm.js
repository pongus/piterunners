import { useEffect } from 'react';
import { func } from 'prop-types';

const LogoutForm = ({ onLogout }) => {
  useEffect(() => {
    onLogout(false);
  }, [onLogout]);

  return null;
};

LogoutForm.propTypes = {
  onLogout: func.isRequired,
};

export default LogoutForm;
