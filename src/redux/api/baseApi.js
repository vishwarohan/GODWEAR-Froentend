import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const apiBaseUrl = API_BASE_URL ? `${API_BASE_URL.replace(/\/$/, '')}/api` : '/api';

export const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

export const getApiError = (error, fallback = 'Something went wrong. Please try again.') =>
  error?.status === 'FETCH_ERROR'
    ? 'Cannot reach API server. Make sure the backend is running and the Vite /api proxy points to the same port.'
    : error?.data?.message || error?.error || fallback;
