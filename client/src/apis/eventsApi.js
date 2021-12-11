import axios from 'axios';
import axiosRetry from 'axios-retry';

const eventsApi = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:7000/api/v1/events'
      : 'https://piterunners.herokuapp.com/api/v1/events',
  timeout: 5000,
});

axiosRetry(eventsApi, { retries: 3 });

export default eventsApi;
