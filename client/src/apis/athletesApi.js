import axios from 'axios';
import axiosRetry from 'axios-retry';

const athletesApi = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:7000/api/v1/athletes'
      : 'https://piterunners.herokuapp.com/api/v1/athletes',
  timeout: 5000,
});

axiosRetry(athletesApi, { retries: 3 });

export default athletesApi;
