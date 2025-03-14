import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react"; // Import signOut for client-side logout
import { BASE_URL } from "./constants";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function apiFetch(endpoint, method, body = null, customHeaders = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  const session = await getServerSession(authOptions); // Get session on the server

  const headers = {
    "Content-Type": "application/json",
    Authorization: session?.token ? `${session.token}` : "",
    ...customHeaders,
  };

  const options = {
    method,
    headers,
    cache: "no-store",
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  // Handle Unauthorized (401) - Expired or Invalid Token
  if (response.status === 401) {
    console.error("Unauthorized: Token expired or invalid. Signing out...");
    await signOut({ redirect: true, callbackUrl: "/login" })
  }

  if (!response.ok) {
    console.error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const apiClient = {
  get: (endpoint, headers = {}) => apiFetch(endpoint, "GET", null, headers),
  post: (endpoint, body, headers = {}) => apiFetch(endpoint, "POST", body, headers),
  put: (endpoint, body, headers = {}) => apiFetch(endpoint, "PUT", body, headers),
};


export const uploadDocumentsApi = async (params,successCallback, errorCallback) => {
  const myHeaders = new Headers();
  // myHeaders.append('upload_type', 'ORDER_DOC');
  const session = await getServerSession(authOptions);
  const token= session?.token ? session?.token : ""
  myHeaders.append('authorization', `${token}`);
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
