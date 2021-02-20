import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { loadWeather } from './actions';

import makeSelectWeather from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Weather(props) {
  useInjectReducer({ key: 'weather', reducer });
  useInjectSaga({ key: 'weather', saga });

  useEffect(() => {
    props.initWeather();
  }, []);

  if (props.weather) {
    return (
        <div>
          {props.weather.map(weather => (
              <div key={weather.Station}>
                {weather.Station} {weather['Temp (°C)']}
              </div>
          ))}
        </div>
    );
  }

  return 'No weather';
}

Weather.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initWeather: PropTypes.func,
  weather: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  weather: makeSelectWeather(),
});

function mapDispatchToProps(dispatch) {
  return {
    initWeather: () => {
      dispatch(loadWeather());
    },
    dispatch,
  };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(Weather);
