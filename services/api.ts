import axios from 'axios';

export const weatherApi = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export const geoApi = axios.create({
  baseURL: 'http://api.openweathermap.org/geo/1.0',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
