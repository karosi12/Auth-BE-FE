import {
  configureStore,
  combineReducers
} from '@reduxjs/toolkit';
import bookSlice from './slice/bookSlice';
import authSlice from './slice/authSlice';

const rootReducer = combineReducers({
  bookReducer: bookSlice,
  authReducer: authSlice,
})


const store = configureStore({
  reducer: rootReducer,
});

export default store;