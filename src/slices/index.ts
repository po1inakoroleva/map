import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './mapSlice';
import searchingResultsReducer from './searchingResultsSlice';
import modalReducer from './modalSlice';
import markersReducer from './markersSlice';

const store = configureStore({
  reducer: {
    map: mapReducer,
    searchingResults: searchingResultsReducer,
    modal: modalReducer,
    usersMarkers: markersReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
