import axios from 'axios';

export const weatherApi = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5',
});

export const geoApi = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/geo/1.0',
});
