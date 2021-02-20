import { LOAD_WEATHER, LOAD_WEATHER_SUCCESS } from './constants';

export function loadWeather(weather) {
  return {
    type: LOAD_WEATHER,
    weather
  };
}

export function weatherLoaded(weather) {
  return {
    type: LOAD_WEATHER_SUCCESS,
    weather
  };
}