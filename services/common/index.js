
import { getCommonlist, uploadDocumentsApi } from "@/app/_lib/action";
import { API } from "@/utils/constants";

export const GetCountry = () => {
  const apiStartpoint = API.countryList;

  const apiUrl = `${apiStartpoint}`;
  return new Promise((resolve, reject) => {
    const params = {};
    getCommonlist(
      apiUrl,
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          const data = successResponse[0]._response;
          resolve(data);
        } else {
          reject([]);
        }
      },
      (errorResponse) => {
        reject([]);
      }
    );
  });
};

export const GetState = () => {
  const apiStartpoint = API.stateList;

  const apiUrl = `${apiStartpoint}`;
  return new Promise((resolve, reject) => {
    const params = {};
    getCommonlist(
      apiUrl,
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          const data = successResponse[0]._response;
          resolve(data);
        } else {
          reject([]);
        }
      },
      (errorResponse) => {
        reject([]);
      }
    );
  });
};
export const GetCity = () => {
  const apiStartpoint = API.cityList;

  const apiUrl = `${apiStartpoint}`;
  return new Promise((resolve, reject) => {
    const params = {};
    getCommonlist(
      apiUrl,
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          const data = successResponse[0]._response;
          resolve(data);
        } else {
          reject([]);
        }
      },
      (errorResponse) => {
        reject([]);
      }
    );
  });
};
export const GetWorkType = () => {
  const apiStartpoint = API.workTypeList;

  const apiUrl = `${apiStartpoint}`;
  return new Promise((resolve, reject) => {
    const params = {};
    getCommonlist(
      apiUrl,
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          const data = successResponse[0]._response;
          resolve(data);
        } else {
          reject([]);
        }
      },
      (errorResponse) => {
        reject([]);
      }
    );
  });
};

export const GetIndusty = () => {
  const apiStartpoint = API.industry;

  const apiUrl = `${apiStartpoint}`;
  return new Promise((resolve, reject) => {
    const params = {};
    getCommonlist(
      apiUrl,
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          const data = successResponse[0]._response;
          resolve(data);
        } else {
          reject([]);
        }
      },
      (errorResponse) => {
        reject([]);
      }
    );
  });
};


export const uploadImage = async (formData) => {
  return new Promise((resolve, reject) => {
    uploadDocumentsApi(
      formData,
      successResponse => {
        console.log('print_data ==> successResponseuploadDocumentsApi', JSON.parse(successResponse).id);
        resolve(JSON.parse(successResponse).id);
      },
      errorResponse => {
        console.log('print_data ==> errorResponseuploadDocumentsApi', errorResponse);
        reject(errorResponse);
      }
    );
  });
};