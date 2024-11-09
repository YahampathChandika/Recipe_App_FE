import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    // baseUrl: import.meta.env.VITE_API_BASE_URL,
    // baseUrl: 'http://44.204.115.155:4000/',
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("accessToken");
      // console.log("hello "+accessToken)
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`),
        headers.set("ngrok-skip-browser-warning", "1");
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;
