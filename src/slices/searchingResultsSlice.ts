/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';
import { geocodeAddress } from './actions';

interface SearchingResult {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: {
    accuracy: string;
  };
  text: string;
  place_name: string;
  center: [number, number];
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  context: {
    id: string;
    mapbox_id: string;
    text: string;
    wikidata?: string;
    short_code?: string;
  }[];
}

interface SearchingResultsState {
  results: SearchingResult[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchingResultsState = {
  results: [],
  loading: false,
  error: null,
};

const searchingResultsSlice = createSlice({
  name: 'searchingResults',
  initialState,
  reducers: {
    clearSearchingResults: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(geocodeAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(geocodeAddress.fulfilled, (state, action: PayloadAction<SearchingResult[]>) => {
        state.loading = false;
        state.error = null;
        state.results = action.payload;
      })
      .addCase(geocodeAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

const { actions } = searchingResultsSlice;
const selectors = {
  selectSearchingResults: (state: RootState) => state.searchingResults.results,
  selectLoadingStatus: (state: RootState) => state.searchingResults.loading,
  selectError: (state: RootState) => state.searchingResults.error,
};

export { actions as searchingResultsActions, selectors as searchingResultsSelectors };
export default searchingResultsSlice.reducer;
