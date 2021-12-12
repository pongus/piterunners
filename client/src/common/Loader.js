import { bool } from 'prop-types';

const Loader = ({ isLoading }) => isLoading && <div className="loader"></div>;

Loader.propTypes = {
  isLoading: bool.isRequired,
};

export default Loader;
