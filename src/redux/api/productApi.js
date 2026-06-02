import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery,
  tagTypes: ['Products', 'Product', 'Categories'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params = {}) => ({ url: '/products', params }),
      providesTags: ['Products'],
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    createProduct: builder.mutation({
      query: (body) => ({ url: '/products', method: 'POST', body }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({ url: `/products/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Products', 'Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Products'],
    }),
    addReview: builder.mutation({
      query: ({ id, body }) => ({ url: `/products/${id}/reviews`, method: 'POST', body }),
      invalidatesTags: ['Product'],
    }),
    logWhatsApp: builder.mutation({
      query: (body) => ({ url: '/whatsapp/log', method: 'POST', body }),
    }),
    getWhatsAppStats: builder.query({
      query: () => '/whatsapp/stats',
    }),
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation({
      query: (body) => ({ url: '/categories', method: 'POST', body }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, body }) => ({ url: `/categories/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({ url: `/categories/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddReviewMutation,
  useLogWhatsAppMutation,
  useGetWhatsAppStatsQuery,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = productApi;
