import { createSlice } from '@reduxjs/toolkit';

const storedCart = JSON.parse(localStorage.getItem('godwearCart') || 'null');
const initialState = storedCart || { cartItems: [], shippingAddress: {} };

const persist = (state) => localStorage.setItem('godwearCart', JSON.stringify(state));

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find(
        (x) => x.product === item.product && x.size === item.size && x.color === item.color,
      );
      if (exist) exist.qty += item.qty;
      else state.cartItems.push(item);
      persist(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.cartKey !== action.payload);
      persist(state);
    },
    updateQuantity: (state, action) => {
      const item = state.cartItems.find((x) => x.cartKey === action.payload.cartKey);
      if (item) item.qty = Math.max(1, action.payload.qty);
      persist(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      persist(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      persist(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, saveShippingAddress, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
