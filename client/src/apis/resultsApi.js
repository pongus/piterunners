import axios from 'axios';
import axiosRetry from 'axios-retry';

const resultsApi = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:7000/api/v1/results'
      : 'https://piterunners.herokuapp.com/api/v1/results',
  timeout: 5000,
});

axiosRetry(resultsApi, { retries: 3 });

export default resultsApi;
