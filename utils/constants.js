export const HTTPMethod = {
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete",
};
export const API = {
  loginAuthenticateUrl: "/authuser/login",
  signUpUrl: "/authuser/signup",
  signupVerifyUrl: "/authuser/signupverify",
  forgotPasswordUrl: "/authuser/forgotpassword",
  resetPasswordUrl: "/authuser/resetpassword",
  serviceTypeUrl: "/servicetypes",
  locationIdUrl: "/locations",
  orderPickupUrl: "/order",
  viewOrderListUrl: "/order",
  countryList: "/country",
  stateList: "/state",
  cityList: "/city",
  vehicles: "/vehicles",
  vehiclesStatus: '/vehicles/updatestatus',
  vehiclesTypeStatus: '/vehicletypes/updatestatus',
  workTypeList: "/worktype",
  viewDeliveryBoyOrderUrl: "/order/deliveryboy/",
  viewConsumerOrderUrl: "/order/consumer/",
  payment: "/payment",
  documentsUpload: "/documents/upload",
  vehicletypesUrl: "/vehicletypes",
  planningSetupUrl: "/planning",
  updateUserProfile: "/",
  viewImageUrl: "/documents/view/",
  lookupDataUrl: "/lookup",
  getAllocatedDeliveryBoy: "/order/allocated/details?o=",
  getAllocatedEnterprise: "/enterprise/order/allocated/details?o=",
  viewOrderDetail: "/order/view/",
  enterprisebranch: "/enterprisebranch/get/",
  enterpriseOrder: "/enterprise/order/",
  getNotificationUrl: "/notification/list/",
  createDeliveryBoyAddressUrl: "/daddressbook/create",
  getDeliveryBoyAddressListUrl: "/daddressbook/list/",
  addressBookUpdateDeliveryBoyUrl: "/daddressbook/update",
  addressBookUpDeleteDeliveryBoyUrl: "/daddressbook/delete/",
  createConsumerAddressUrl: "/caddressbook/create",
  getConsumerAddressListUrl: "/caddressbook/list/",
  addressBookUpdateConsumerUrl: "/caddressbook/update",
  addressBookUpDeleteConsumerUrl: "/caddressbook/delete/",
  getCompanyListUrl: "/deliveryboy/connections/",
  getDistancePriceListUrl: "/vehicletypes/price/list?d=",
  getFaqListUrl: "/faq",
  enterprisebranchCreate: "/enterprisebranch",
  cancelOrderUrl: "/order/cancel",
  deliveryBoyPlanningSetupDateList: "/order/deliveryboy/plan/list",
  checkPromoCodeUrl: "/promocode/check",
  orderRequestActionUrl: "/order/deliveryboy/request/action",
  paymentCancelRequestUrl: "/payment/update",
  enterpriseOrdersUrl: "/enterprise/order/getbyext/",
  viewEnterpriseOrderDetail: "/enterprise/order/view/",
  getDeliveryBoyWalletUrl: "/deliveryboy/wallet/balance/",
  getDeliveryBoyTransactionUrl: "/deliveryboy/wallet/transaction/",
  orderStatusUpdateUrl: "/order/update/status",
  consumerWalletUrl: "/consumer/wallet/balance/",
  consumerPaymentMethodUrl: "/consumer/paymentmethod",
  consumerBillingDetailsUrl: "/consumer/billing/address/update",
  getconsumerBillingDetailsUrl: "/consumer/billing/address/get/",
  enterprisePlanSearch: "/enterprise/order/plan/search",
  changePasswordUrl: "/authuser/changepassword",
  enterpriseDashboardUrl: "/enterprise/dashboard/",
  imageViewUrl: "/documents/view/",
  getEnterpriseAddressListUrl: "/enterprise/address/list/",
  createEnterpriseAddressUrl: "/enterprise/address/create",
  addressBookUpdateEnterpriseUrl: "/enterprise/address/update",
  addressBookDeleteEnterpriseUrl: "/enterprise/address/delete/",
  enterprisePaymentMethod: "/enterprise/paymentmethod/getpaymentcard/",
  verifyOrderOTP: "/order/otp/verify",
  verifyOrderDeliveryOTP: "/order/delivered/otp/verify",
  enterprisePaymentMethodUrl: "/enterprise/paymentmethod",
  //admin side
  updateJoinStatus: "/joinrequest/action",
  getJoinRequest: "/joinrequest/getall",
  getJoinDetail: "/joinrequest/getjoinrequest",
  getConsumer: "/consumer",
  getEnterprise: "/enterprise",
  getDeliveryboy: "/deliveryboy",
  getAllorderList: "/order",
  getAdmindashboard: "/dashboard/admin",
};

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const formatDate = (isoString) => {
  const date = new Date(isoString);

  // Get day, month, year, hours, and minutes
  const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  // Get hours and minutes in 24-hour format
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Construct the formatted string
  return `${day}-${month}-${year} at ${hours}:${minutes}`;
};

export const getRole = (role) => {
  switch (role) {
    case "DELIVERY_BOY":
      return "Delivery boy";
    case "ENTERPRISE":
      return "Enterprise";
    case "CONSUMER":
      return "Pickup & Dropoff";
    default:
      return "Unknown role";
  }
};

export const getStatus = (status) => {
  switch (status) {
    case "ORDER_ACCEPTED":
      return "Accepted";
    case "ORDER_ALLOCATED":
      return "Allocated";
    case "ON_THE_WAY_DROP_OFF":
      return "OnTheWayDropoff";
    case "ORDER_PLACED":
      return "OrderPlaced";
    case "CONIRMED":
      return "Confirmed";
    case "PAYMENT_COMPLETED":
      return "PaymentCompleted";
    case "ON_THE_WAY_PICKUP":
      return "OnTheWayPickup";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
    default:
      return status;
  }
};

export const maskEmail = (email) => {
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return email; // Return original email if it's not in a valid format

  const maskedLocalPart =
    localPart[0] + "*".repeat(Math.max(localPart.length - 1, 0));
  return `${maskedLocalPart}@${domain}`;
};

export const maskPhoneNumber = (phone) => {
  const visibleDigits = 4;
  if (phone.length <= visibleDigits) return phone; // Return original phone if it's too short

  const maskedPart = "*".repeat(Math.max(phone.length - visibleDigits, 0));
  const lastFourDigits = phone.slice(-visibleDigits);
  return `${maskedPart}${lastFourDigits}`;
};


export const rideHeader = ()=>{
  return [
    {label:"Ride Id"},
    {label:"Customer"},
    {label:"Service"},
    {label:"Date"},
    {label:"Payment Method"},
    {label:"Status"},
    {label:"Total Amount"}
  ]
}

export const rideConsumer = ()=>{
  return [
    {label:"Ride Id"},
    {label:"Driver"},
    {label:"Service"},
    {label:"Date"},
    {label:"Payment Method"},
    {label:"Status"},
    {label:"Total Amount"}
  ]
}

export const walletHeader = ()=>{
  return [
    {label:"Id"},
    {label:"Payment Method"},
    {label:"Order Type"},
    {label:"Txn Id"},
    {label:"Date"},
    {label:"Note"},
    {label:"Total Amount"}
  ]
}

export const payoutHeader = ()=>{
  return [
    {label:"Amount"},
    {label:"Note"},
    {label:"Paid Date"},
    {label:"Status"},
  ]
}

export const documentHeader = ()=>{
  return [
    {label:"Name"},
    {label:"Status"},
    {label:"Action"},
  ]
}

export const baseProfilePicUrl = 'http://16.171.224.246:3009/api/documents/view/';

export const getValidImageUrl = (profilePic) => {
    const url = `${baseProfilePicUrl}${profilePic?.replace(/\.[^.]+$/, '')}`;
   return url
};
export const getValidedImageUrl = async (profilePic) => {
  const url = `${baseProfilePicUrl}${profilePic?.replace(/\.[^.]+$/, '')}`;
  try {
      const response = await fetch(url, {method: 'GET',});
      if (response.status ==200) {
          return {
            url,
            status:true
          };
      } else {
        return {
          url,
          status:false
        }; 
      }
  } catch (error) {
    return {
      url,
      status:false
    };
  }
};


export const checkImageExists = async (url) => {
  try {
    const response = await fetch(url, { method: "GET" });
    if(response.status==400){
      return false
    }
    return response.ok; 
  } catch (error) {
    return false;
  }
};

export const getAddressLine= (address,city,state,postal_code,country)=>{
  let code =postal_code+'-'
  if(postal_code == null){
     code=''
  }
  return `${address},${city},${state},${code} ${country}`
}


export const paginate = (data, currentPage, itemsPerPage) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return data.slice(indexOfFirstItem, indexOfLastItem);
};

export const calculateTotalPages = (dataLength, itemsPerPage) => {
  return Math.ceil(dataLength / itemsPerPage);
};
export const headers = {
  deliveryboy: [
    "Name",
    "Email",
    "Phone",
    "Documents",
    "Created On",
    "Service",
    "Action",
  ],
  consumer: ["Name", "Email", "Phone", "Created On", "Active", "Action"],
  enterprise: [
    "Name",
    "Email",
    "Phone",
    "Industry",
    "Company",
    "Created On",
    "Action",
  ],
  vehicle: [
    "Owner Name",
    "Vehicle Type",
    "Image",
    "Plat No",
    "Modal",
    "Make",
    "status",
    "Action",
  ],

  vehicletype: [
    "Title",
    "Image",
    "Base Price",
    "Km Price",
    "Description",
    "status",
    "Action",
  ],
};