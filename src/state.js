import { createStore } from 'redux';
const SET_STATE = 'SET_STATE';

const defaultState = {
  restaurants: [],
  crimes: [],
  crime_restaurants: [],
  userLocation: null,
  selectedRestaurant: null
};

const setState = function(state) {
  console.log('STATE', state)
  return {
    type: SET_STATE,
    payload: state
  };
}

const setStateReducer = function(state = defaultState, action) {
  switch (action.type) {
    case SET_STATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

const store = createStore(setStateReducer);

export {
  setState,
  store
};
