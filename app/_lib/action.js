import React from "react";


import { axiosCall } from "@/utils/apiClient";
import { API, BASE_URL, HTTPMethod } from "@/utils/constants";




export const getEnterprise = (params, successCallback, errorCallback,token) => {
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
    token,
  );
};

export const getAdmindashboard = (params, successCallback, errorCallback,token) => {
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
    token,
  );
};

export const getJoinlist = (url,params, successCallback, errorCallback,token) => {
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
    token,
  );
};


export const updateJoinStatus = (
  params,
  successCallback,
  errorCallback,
  token
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
    token,
  );
};

export const getCommonlist=(url,params, successCallback, errorCallback,token) => {
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
    token,
  );
};


export const getByID=(url,params, successCallback, errorCallback,token) => {
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
    token,
  );
};

export const UpdateQuery=(url,params, successCallback, errorCallback,token) => {
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
    token,
  );
};

export const UpdateStatusQuery=(url,params, successCallback, errorCallback,token) => {
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
    token,
  );
};

export const uploadDocumentsApi = (params, successCallback, errorCallback) => {
  const myHeaders = new Headers();
  // myHeaders.append('upload_type', 'ORDER_DOC');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: params,
    redirect: 'follow',
  };

  fetch(BASE_URL+API.documentsUpload, requestOptions)
    .then(response => response.text())
    .then(result => successCallback(result))
    .catch(error => errorCallback(error));
};

export const assginMultipleDeliveryboy=(url,params, successCallback,token) => {
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
    token,
  );
};