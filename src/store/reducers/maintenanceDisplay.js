import { createSlice } from '@reduxjs/toolkit';
import {
  requestMaintenanceDisplay
} from 'services/api/tasks';

const initialState = {
  list: [],
  fetching: false,
  error: null,
  data: {},
};

const maintenanceDisplay = createSlice({
  name: 'maintenanceDisplay',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    fetchSuccess: (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    },
    fetchFailed: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },

  },
});

export const { fetchStart, fetchSuccess, fetchFailed } = maintenanceDisplay.actions;

export const fetchMaintenanceDisplay = () => async (dispatch) => {
  dispatch(fetchStart());
  const { success, data, message } = await requestMaintenanceDisplay();
  if (success) {
    dispatch(fetchSuccess(data.data));
  } else {
    dispatch(fetchFailed(message));
  }
};
export default maintenanceDisplay.reducer;

