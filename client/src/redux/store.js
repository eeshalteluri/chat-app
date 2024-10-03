import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Remove the curly braces around 'thunk'
import useReducer from './reducer';

const store = configureStore({
  reducer: useReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Correct way to pass thunk middleware
});

export default store;
