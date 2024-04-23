/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import 'mapbox-gl/dist/mapbox-gl.css';

import type { RootState } from './index';
import { MarkerData } from '../types';

interface markersState {
  markers: MarkerData[];
}

const initialState: markersState = {
  markers: [],
};

const markersSlice = createSlice({
  name: 'usersMarkers',
  initialState,
  reducers: {
    addMarker: (state, action: PayloadAction<MarkerData>) => {
      state.markers.push(action.payload);
    },
    removeMarker: (state, action: PayloadAction<string>) => {
      const { markers } = state;
      const newState = markers.filter(({ id }) => id !== action.payload);
      state.markers = newState;
    },
    editMarker: (state, action: PayloadAction<MarkerData>) => {
      const { markers } = state;
      const newState = markers.filter(({ id }) => id !== action.payload.id);
      newState.push(action.payload);
      state.markers = newState;
    },
  },
});

const { actions } = markersSlice;
const selectors = {
  getMarkers: (state: RootState) => state.usersMarkers.markers,
};

export { actions as markersActions, selectors as markersSelectors };
export default markersSlice.reducer;
