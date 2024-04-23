import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './index';
import { markersActions } from './markersSlice';
import { MarkerData } from '../types';

interface viewState {
  longitude: number,
  latitude: number,
  zoom: number,
}

const initialState: viewState = {
  longitude: 37.6141261,
  latitude: 55.7525682,
  zoom: 9,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setViewState: (state, action) => {
      const { longitude, latitude, zoom } = action.payload;
      return {
        ...state, longitude, latitude, zoom,
      };
    },
    setMapCenter: (state, action: PayloadAction<[number, number]>) => {
      const [longitude, latitude] = action.payload;
      return { ...state, longitude, latitude };
    },
    setMapZoom: (state, action: PayloadAction<number>) => {
      const zoom = action.payload;
      return { ...state, zoom };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(markersActions.addMarker, (state, action: PayloadAction<MarkerData>) => {
        const [longitude, latitude] = action.payload.coordinates;
        return { ...state, longitude, latitude };
      });
  },
});

const { actions } = mapSlice;
const selectViewState = (state: RootState) => state.map;

export { actions as mapActions, selectViewState };
export default mapSlice.reducer;
