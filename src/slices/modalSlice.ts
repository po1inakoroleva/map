/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './index';
import { MarkerData, ModalPayload } from '../types';

interface ModalState {
  isOpened: boolean,
  context: MarkerData | null,
  type: 'ADD' | 'EDIT' | 'REMOVE' | null,
}

const initialState: ModalState = {
  isOpened: false,
  context: null,
  type: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<ModalPayload>) => {
      state.isOpened = true;
      state.context = action.payload.marker;
      state.type = action.payload.type;
    },
    close: (state) => {
      state.isOpened = false;
    },
  },
});

const { actions } = modalSlice;
const selectors = {
  isModalOpened: (state: RootState) => state.modal.isOpened,
  getModalContext: (state: RootState) => state.modal.context,
  getModalType: (state: RootState) => state.modal.type,
};

export { actions as modalActions, selectors as modalSelectors };
export default modalSlice.reducer;
