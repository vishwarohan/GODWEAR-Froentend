import { createSlice } from '@reduxjs/toolkit';

const userInfo = JSON.parse(localStorage.getItem('godwearUser') || 'null');

const authSlice = createSlice({
  name: 'auth',
  initialState: { userInfo },
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('godwearUser', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('godwearUser');
      localStorage.removeItem('godwearCart');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
