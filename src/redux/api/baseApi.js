import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const apiBaseUrl = API_BASE_URL ? `${API_BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '')}/api` : '/api';

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
    ? 'Cannot reach API server. Check that the backend is running and VITE_API_BASE_URL points to the deployed API.'
    : error?.data?.message || error?.error || fallback;
