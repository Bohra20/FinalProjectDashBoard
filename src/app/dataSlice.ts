import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  userList: any[]; // Modify this based on your data structure
  userDetails: any; // Modify this based on your data structure
}

const initialState: DataState = {
  userList: [],
  userDetails: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<any[]>) => {
      state.userList = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserList, setUserDetails } = dataSlice.actions;
export default dataSlice.reducer;
