import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'productsUi',
  initialState: {
    filters: { category: '', size: '', minPrice: '', maxPrice: '', sort: 'newest', page: 1 },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload, page: action.payload.page || 1 };
    },
  },
});

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;
