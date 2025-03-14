"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { apiClient, uploadDocumentsApi } from "@/utils/apiHandler";
import { API, baseProfilePicUrl } from "@/utils/constants";
import { getServerSession } from "next-auth";

export const GetVl = async () => {
  const apiStartpoint = API.vehicles;
  const [res] = await apiClient.get(apiStartpoint);
  return res;
};

export const GetVehicles = async (page, search, pageSize) => {
  const apiStartpoint = API.vehicles+'/getall';
  const queryParams = new URLSearchParams();
  if (parseInt(page) > 0) queryParams.append("page", page);
  if (parseInt(pageSize) > 0) queryParams.append("pagesize", pageSize);
  if (search) queryParams.append("search", search);
  const apiUrl = `${apiStartpoint}?${queryParams.toString()}`;
  const [res] = await apiClient.get(apiUrl);
  return res;
};

export const GetVehiclesById = async (Id) => {
  const apiStartpoint = API.vehicles+'/'+Id;
  const [res] = await apiClient.get(apiStartpoint);
  return res;
};

export const GetVT = async (page, search, pageSize) => {
  const apiUrl = API.vehicletypesUrl;
  const [res] = await apiClient.get(apiUrl);
  return res;
  
};
export const GetVehicleTypes = async (page, search, pageSize) => {
  const apiStartpoint = API.vehicletypesUrl+'/getall';
  const queryParams = new URLSearchParams();
  if (parseInt(page) > 0) queryParams.append("page", page);
  if (parseInt(pageSize) > 0) queryParams.append("pagesize", pageSize);
  if (search) queryParams.append("search", search);
  const apiUrl = `${apiStartpoint}?${queryParams.toString()}`;
  const [res] = await apiClient.get(apiUrl);
  return res;
  
};

export const GetVehicleTypeById = async (Id) => {
  const apiStartpoint = API.vehicletypesUrl+'/'+Id;
  const [res] = await apiClient.get(apiStartpoint);
  return res;
  
};

export const updateVehicle = async (params) => {
  const apiUrl =`${API.vehicles}?ext_id=${params.delivery_boy_ext_id}`;
  const [res] = await apiClient.put(apiUrl,params);
  return res
};

export const updateVehicleType = async (params, vehicleTypeId) => {
  const apiUrl = `${API.vehicletypesUrl}/${vehicleTypeId}`;
  const [res] = await apiClient.put(apiUrl, params);
  return res?._response;
};

// delete vehicle query
export const UdateVehicleStatus = async (params, Id) => {
  const apiUrl = `${API.vehiclesStatus}/${Id}`;
  const [res] = await apiClient.put(apiUrl, params);
  return res;
};

//update vehicle status
export const UdateVehicleTypeStatus = async (params, Id) => {
  const apiUrl = `${API.vehiclesTypeStatus}/${Id}`;
  const [res] = await apiClient.put(apiUrl, params);
  return res;
};

export const getImageByUrl = async (url) => {
  const getRes = await getValidedImageUrl(url);
  return getRes;
};

const getValidedImageUrl = async (profilePic) => {
  const url = `${baseProfilePicUrl}${profilePic?.replace(/\.[^.]+$/, "")}`;
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: session?.token ? `${session.token}` : "", // Replace with your token
        "Content-Type": "application/json", // Optional, but good practice
      },
    });
    if (response.status == 200) {
      return {
        url,
        status: true,
      };
    } else {
      return {
        url,
        status: false,
      };
    }
  } catch (error) {
    return {
      url,
      status: false,
    };
  }
};


export const GetCountry = async () => {
  const apiStartpoint = API.countryList;
  const [res] = await apiClient.get(apiStartpoint);
  return res;
};

export const GetState = async () => {
  const apiStartpoint = API.stateList;
  const [res] = await apiClient.get(apiStartpoint);
  return res;
};
export const GetCity = async () => {
  const apiStartpoint = API.cityList;
  const [res] = await apiClient.get(apiStartpoint);
  return res;
};
export const GetWorkType = async () => {
  const apiStartpoint = API.workTypeList;
  const [res] = await apiClient.get(apiStartpoint);
  return res;
};

export const GetIndusty = async() => {
  const apiStartpoint = API.industry;
  const [res] = await apiClient.get(apiStartpoint);
  return res;
};


//image upload 
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


//dashborad data

export const getDashboardData = async () =>{
  const apiUrl=API.getAdmindashboard;
  const [res]=await apiClient.get(apiUrl)
  return res
}