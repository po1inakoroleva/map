/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';

import geocodingService from '../services/geocodingService';

export const geocodeAddress = createAsyncThunk(
  'geocoding/geocodeAddress',
  async (address: string, { rejectWithValue }) => {
    try {
      const geocodedData = await geocodingService.geocodeAddress(address);
      return geocodedData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
