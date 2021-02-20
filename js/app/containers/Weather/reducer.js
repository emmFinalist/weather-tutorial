import produce from 'immer';
import {LOAD_WEATHER_SUCCESS} from './constants';

export const initialState = {};

const weatherReducer = (state = initialState, action) =>
    produce(state, (draft) => {
      switch (action.type) {
        case LOAD_WEATHER_SUCCESS:
          draft.weather = action.weather;
          break;
      }
    });

export default weatherReducer;
