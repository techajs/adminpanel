"use client";
import MapComponent from "@/components/MapComponent";
import React, { useEffect, useState } from "react";
import { FaPrint } from "react-icons/fa";
import EnterpirseBillingDetail from "./common/billingdetail";
import EnterpriseAdditionDetail from "./common/additiondetail";
import EnterpriseBasicDetail from "./common/basicdetail";
import Image from "next/image";
import {
  calculateHoursDifference,
  formatDate,
  getAddressLine,
  getStatus,
  getValidImageUrl,
} from "@/utils/constants";
import Link from "next/link";
import { UpdateStatus } from "@/services/enterprise";
import ListDeliveryboy from "@/components/order/views/orderdetail/delivery-list";
import { getAvailableDeliveryboy } from "@/services/deliveryboy";

const ShiftOrder = ({ order, deliveryboy, vehicle, orderLine, slots }) => {
  const [hours, setHours] = useState(0);
  const [loading, setLoading] = useState(false);
  const [localData, setLocalData] = useState(order);
  const [deliveryBoys, setDeliveryBoys] = useState(null);

  const totalHours = slots?.reduce((acc, slot) => {
    const hours = calculateHoursDifference(slot?.from_time, slot?.to_time);
    return acc + hours;
  }, 0);

  const AssignDeliveryboy = () => {
    console.log("testing");
  };
  const handleStatusChange = (e) => {
    console.log(e.target.value);
  };
  const updateStatus = async (status, order_number) => {
    setLoading(true);
    const payload = {
      status,
      order_number,
    };
    try {
      const response = await UpdateStatus(payload);
      setSuccessMsg(response);
      refreshData();
      setLocalData((prev) =>
        prev.map((item) =>
          item.order_number === order_number
            ? { ...item, order_status: status }
            : item
        )
      );
    } catch (err) {
      if (err[0]?._errors) {
        console.log(err[0]._errors.message);
      } else {
        console.log(err);
      }
      // console.log(err)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setHours(totalHours || 0);
    const getDeliveryboyAvailable = async () => {
      try {
        const response = await getAvailableDeliveryboy();
        setDeliveryBoys(response);
      } catch (error) {
        setDeliveryBoys([]);
      }
    };
    if(!localData?.delivery_boy_name) {
      getDeliveryboyAvailable();
    }
  }, [slots,localData]);
  return (
    <>
      <div className="container mx-auto p-8">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="w-full">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="lg:w-2/3">
                <div className="border rounded-lg shadow-sm">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-4 dark:text-white text-black">
                      Shift overview:
                    </h4>
                    <div className="flex justify-between space-x-8 mb-6">
                      <div>
                        <h2 className="text-3xl font-bold dark:text-white text-black">
                          2
                        </h2>
                        <p className="text-gray-500 dark:text-white">
                          Total days
                        </p>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold dark:text-white text-black">
                          {hours}
                        </h2>
                        <p className="text-gray-500 dark:text-white">
                          Total Hours
                        </p>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold dark:text-white">
                          € 40.00
                        </h2>
                        <p className="text-gray-500 dark:text-white">
                          Aprox earning
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-gray-600 dark:text-white">
                      <p>
                        From{" "}
                        <b> {formatDate(localData?.repeat_until, false)}</b>
                      </p>
                      <span>&rarr;</span>
                      <p>
                        To <b> {formatDate(localData?.repeat_until, false)}</b>
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-600 mt-3 dark:text-white">
                      <p>
                        Branch Name :{" "}
                        <b>
                          {" "}
                          {getAddressLine(
                            localData?.pickup_location_address ||
                              localData?.b_address,
                            localData?.pickup_location_city ||
                              localData?.b_city,
                            localData?.pickup_location_state ||
                              localData?.b_state,
                            localData?.pickup_location_postal_code ||
                              localData?.b_postal_code,
                            localData?.pickup_location_country ||
                              localData?.b_country
                          ) || "Start location unavailable"}
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 lg:ml-6 mt-6 lg:mt-0">
                <div className="p-4 bg-white border rounded-lg shadow-sm flex items-center justify-between dark:bg-boxdark dark:border-strokedark">
                  <div className="flex items-center">
                    <Image
                      className="h-15 w-15 mr-3 rounded-full"
                      src={getValidImageUrl(localData?.consumer_pic || "")}
                      alt={`${
                        localData?.consumer_name?.charAt(0).toUpperCase() || "E"
                      }`}
                      width={100}
                      height={100}
                    />
                    <div>
                      <h4 className="text-lg font-semibold dark:text-white text-black">
                        {localData?.consumer_name}
                      </h4>
                      <p className="text-gray-500 dark:text-white">
                        {getAddressLine(
                          localData?.pickup_location_address ||
                            localData?.b_address,
                          localData?.pickup_location_city || localData?.b_city,
                          localData?.pickup_location_state ||
                            localData?.b_state,
                          localData?.pickup_location_postal_code ||
                            localData?.b_postal_code,
                          localData?.pickup_location_country ||
                            localData?.b_country
                        ) || "Start location unavailable"}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-center  rounded-full bg-opacity-10 px-1 py-1 text-sm font-medium ${
                      localData.order_status === "REQUEST_PENDING"
                        ? "bg-warning text-warning"
                        : "bg-success text-success"
                    }`}
                  >
                    {getStatus(localData?.order_status) || "Request"}
                  </p>
                </div>

                {localData?.order_status == "REQUEST_PENDING" ? (
                  <div className="mt-4">
                    <Link
                      href="#"
                      onClick={() =>
                        updateStatus("accepted", localData?.order_number)
                      }
                      className="w-full block text-center bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 dark:bg-blue-600"
                    >
                      Accept
                    </Link>
                  </div>
                ) : (
                  <p className="border-b-2 border-dotted border-gray-300 pb-2 flex justify-start gap-3 mt-3">
                    <strong>Delivery Boy Name: </strong>

                    {localData?.delivery_boy_name ? (
                      <div className="flex items-center justify-start gap-2 ">
                        {/* <div className="bg-green-500 w-16 h-16 rounded-full  mb-4">
            {localData?.delivery_pic ? (
              <Image
                src={getValidImageUrl(localData?.delivery_pic)}
                alt={`${order.delivery_boy_name}`}
                className="w-full h-full rounded-full object-cover"
                width={30}
                height={30}
              />
            ) : (
              <span className="text-2xl text-white font-bold">
                {localData?.delivery_boy_name
                  ? order.delivery_boy_name.charAt(0).toUpperCase()
                  : "D"}
              </span>
            )}
          </div> */}

                        <Link
                          href={`/deliveryboy/${localData?.delivery_boy_ext}`}
                          className="text-primary"
                        >
                          {localData?.delivery_boy_name}
                        </Link>
                      </div>
                    ) : (
                      <ListDeliveryboy
                        selectedOption={localData?.delivery_boy_id}
                        onPageChange={handleStatusChange}
                        optionValue={deliveryBoys}
                      />
                    )}
                  </p>
                )}

                {/* <div className="mt-4 flex space-x-4">
                  <button className="w-full text-center border border-gray-400 py-2 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white">
                    Download
                  </button>
                  <button className="w-full text-center border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-100 dark:border-red-400 dark:hover:bg-red-700 dark:text-white ">
                    Reject
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div class="flex justify-center mb-5">
            <div class="flex items-center p-2 rounded-lg shadow-md">
              <div class="flex items-center">
                <p class="text-lg font-medium p-2 text-black dark:text-white">
                  Shift Details
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    #
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Day
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Start Time
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    End Time
                  </th>
                  <th className="text-center px-4 py-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="text-center px-4 py-4 font-medium text-black dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {slots?.map((packageItem, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {key + 1}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.day}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.from_time}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.to_time}
                      </p>
                    </td>

                    <td className="text-center border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p
                        className={`text-center  rounded-full bg-opacity-10 px-1 py-1 text-sm font-medium ${
                          packageItem.is_selected === 1
                            ? "bg-success text-success"
                            : "bg-warning text-warning"
                        }`}
                      >
                        {packageItem.is_selected == 0 ? "Pending" : "Ongoing"}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="mt-4 flex space-x-4">
                        <button className="w-full text-center border border-gray-400 py-2 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white">
                          Done
                        </button>
                        <button className="w-full text-center border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-100 dark:border-red-400 dark:hover:bg-red-700 dark:text-white ">
                          Start
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShiftOrder;
