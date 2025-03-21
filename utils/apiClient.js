import axios from 'axios';
import { BASE_URL, HTTPMethod } from './constants';
import { signOut,getSession } from 'next-auth/react';

export const axiosCall = async (
  url,
  method,
  params = {},
  callbackResponse,
  callbackErrorResponse,
) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    async function (config) {
      const session = await getSession();
      if (session) {
        config.headers.Authorization =session.token
      }
      return config;
    },
    function (error) {
      let parseError = JSON.stringify(error);
      let errorResponse = JSON.parse(parseError);
      return callbackErrorResponse(errorResponse);
    }
  );

  axiosInstance.interceptors.response.use(
    async function (response) {
      if (response.status === 200 || response.status === 201) {
        return callbackResponse(response.data);
      } else if (response.status === 401) {
        await signOut({ redirect: true, callbackUrl: "/login" })
        return callbackErrorResponse(response.data);
      } else {
        return callbackErrorResponse(response.data);
      }
    },
    function (error) {
      let err = '';
      if (error?.response) {
        err = error?.response;
      } else {
        err = error;
      }
      let parseError = JSON.stringify(err);
      let errorResponse = JSON.parse(parseError);
      return callbackErrorResponse(errorResponse);
    }
  );

  try {
    let response;
    switch (method) {
      case HTTPMethod.GET:
        response = await axiosInstance.get(url, { params });
        break;
      case HTTPMethod.POST:
        response = await axiosInstance.post(url, params);
        break;
      case HTTPMethod.PUT:
        response = await axiosInstance.put(url, params);
        break;
      case HTTPMethod.DELETE:
        response = await axiosInstance.delete(url, { params });
        break;
      default:
        throw new Error('Invalid HTTP method');
    }
    return response;  // Return the response data
  } catch (error) {
    console.error('Request Execution Error:', error);
    return callbackErrorResponse(error);
  }
};
