"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { apiClient } from "@/utils/apiHandler";
import { API, baseProfilePicUrl } from "@/utils/constants";
import { getServerSession } from "next-auth";

export const GetVehicles = async () => {
  const apiStartpoint = API.vehicles;
  const apiUrl = `${apiStartpoint}`;
  const [res] = await apiClient.get(apiUrl);
  return res?._response;
};

export const GetVehicleTypes = async () => {
  const apiStartpoint = API.vehicletypesUrl;
  const apiUrl = `${apiStartpoint}`;
  const [res] = await apiClient.get(apiUrl);
  return res?._response;
};

export const updateVehicle = async (params) => {
  const apiUrl = `${API.vehicles}`;
  const [res] = await apiClient.put(apiUrl, params);
  return res?._response;
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
  return res?._response;
};

//update vehicle status
export const UdateVehicleTypeStatus = async (params, Id) => {
  const apiUrl = `${API.vehiclesTypeStatus}/${Id}`;
  const [res] = await apiClient.put(apiUrl, params);
  return res?._response;
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
