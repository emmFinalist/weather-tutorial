import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_WEATHER } from './constants';
import { weatherLoaded } from './actions';
import request from 'utils/request';

export function* getWeather() {
  let requestURL = 'http://scraper.test';
  if (process.env.NODE_ENV == 'production') {
    requestURL = 'https://emmanuelweethetwel.nl/weather/index.php';
  }
  try {
    const weather = yield call(request, requestURL);
    yield put(weatherLoaded(weather));
  } catch (e) {
    console.error(e);
  }
}

export default function* weatherData() {
  yield takeLatest(LOAD_WEATHER, getWeather);
}