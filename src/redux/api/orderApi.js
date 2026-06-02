import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery,
  tagTypes: ['Orders', 'MyOrders'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({ url: '/orders', method: 'POST', body }),
      invalidatesTags: ['Orders', 'MyOrders'],
    }),
    getMyOrders: builder.query({
      query: () => '/orders/myorders',
      providesTags: ['MyOrders'],
    }),
    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
    }),
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({ url: `/orders/${id}/status`, method: 'PUT', body: { status } }),
      invalidatesTags: ['Orders', 'MyOrders'],
    }),
    createRazorpayOrder: builder.mutation({
      query: (body) => ({ url: '/payment/razorpay', method: 'POST', body }),
    }),
    verifyPayment: builder.mutation({
      query: (body) => ({ url: '/payment/verify', method: 'POST', body }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderQuery,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useCreateRazorpayOrderMutation,
  useVerifyPaymentMutation,
} = orderApi;
