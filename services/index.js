import {getCommonlist, UpdateQuery, UpdateStatusQuery } from "@/app/_lib/action";
import { API } from "@/utils/constants";

export const GetVehicles = () => {
  const apiStartpoint =API.vehicles;

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

export const GetVehicleTypes = () => {
  const apiStartpoint =API.vehicletypesUrl;
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

export const updateVehicle = (params) => {
  const apiUrl =`${API.vehicles}`;
  return new Promise((resolve, reject) => {
    UpdateQuery(
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
        reject(errorResponse);
      }
    );
  });
};

export const updateVehicleType = (params,vehicleTypeId) => {
  const apiUrl =`${API.vehicletypesUrl}/${vehicleTypeId}`;
  return new Promise((resolve, reject) => {
    UpdateQuery(
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
        reject(errorResponse);
      }
    );
  });
};

// delete vehicle query
export const UdateVehicleStatus = (params,Id) => {
  const apiUrl =`${API.vehiclesStatus}/${Id}`;
  return new Promise((resolve, reject) => {
    UpdateStatusQuery(
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
        reject(errorResponse);
      }
    );
  });
};

//update vehicle status 
export const UdateVehicleTypeStatus = (params,Id) => {
  const apiUrl =`${API.vehiclesTypeStatus}/${Id}`;
  return new Promise((resolve, reject) => {
    UpdateStatusQuery(
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
        reject(errorResponse);
      }
    );
  });
};