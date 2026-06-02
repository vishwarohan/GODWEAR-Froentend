import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import { authApi } from './api/authApi';
import { productApi } from './api/productApi';
import { orderApi } from './api/orderApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    productsUi: productReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware, orderApi.middleware),
});
