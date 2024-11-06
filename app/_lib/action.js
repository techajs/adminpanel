import React from "react";


import { axiosCall } from "@/utils/apiClient";
import { API, HTTPMethod } from "@/utils/constants";




export const getEnterprise = (params, successCallback, errorCallback) => {
  axiosCall(
    API.getEnterprise,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getAdmindashboard = (params, successCallback, errorCallback) => {
  axiosCall(
    API.getAdmindashboard,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getJoinlist = (url,params, successCallback, errorCallback) => {
  axiosCall(
    url,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};


export const updateJoinStatus = (
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.updateJoinStatus,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getCommonlist=(url,params, successCallback, errorCallback) => {
  axiosCall(
    url,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};


export const getByID=(url,params, successCallback, errorCallback) => {
  axiosCall(
    url,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const UpdateQuery=(url,params, successCallback, errorCallback) => {
  axiosCall(
    url,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const UpdateStatusQuery=(url,params, successCallback, errorCallback) => {
  axiosCall(
    url,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};






