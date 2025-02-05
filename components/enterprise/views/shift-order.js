"use client";
import MapComponent from "@/components/MapComponent";
import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaEdit,
} from "react-icons/fa";
import EnterpirseBillingDetail from "./common/billingdetail";
import EnterpriseAdditionDetail from "./common/additiondetail";
import EnterpriseBasicDetail from "./common/basicdetail";
import Image from "next/image";
import Select from "react-select";
import {
  calculateHoursDifference,
  formatDate,
  getAddressLine,
  getStatus,
  getValidImageUrl,
} from "@/utils/constants";
import Link from "next/link";
import { GetOrderByNumber, UpdateStatus } from "@/services/enterprise";
import ListDeliveryboy from "@/components/order/views/orderdetail/delivery-list";
import {
  assignDeliveryboyshift,
  assignMultipleDeliveryboyshift,
  getAvailableDeliveryboy,
} from "@/services/deliveryboy";
import { MdClose, MdRefresh } from "react-icons/md";

const ShiftOrder = ({ order, deliveryboy, vehicle, orderLine, slots }) => {
  const [hours, setHours] = useState(0);
  const [loading, setLoading] = useState(false);
  const [localData, setLocalData] = useState(order);
  const [localSlots, setLocalSlots] = useState(slots);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [deliveryBoys, setDeliveryBoys] = useState(null);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [updateEdit, setUpdateEdit] = useState(false);
  const [slotRowId, setSlotRowId] = useState(null);
  const [masterDeliveryboy, setMasterDeliveryboy] = useState(null);
  const [slotId, setSlotId] = useState(null);
  const [extId, setExtId] = useState(null);
  const [isResfresh,setIsRefresh]=useState(false)
  //  console.log('order',order,'deliveryboy',deliveryboy,"vehicle",vehicle,'slots',slots)
  
  const totalHours = slots?.reduce((sum, slot) => sum + (slot.total_hours || 0), 0).toFixed(2)
  const handleStatusChange = async () => {
    if (localData?.order_status == "REQUEST_PENDING") {
      alert("before assign accept shift");
      return;
    }
    const payload = {
      order_number: localData.order_number,
      delivery_boy_ext_id: extId,
      slot_id: slotId,
    };
    setUpdateEdit(false);
    setSlotRowId(null);
    setLoading(true);
    
    try {
      const response = await assignDeliveryboyshift(payload);
      setIsRefresh(true)
      setSuccessMessage("Delivery boy assigned successfully done.");
    } catch (error) {
      console.log(error);
      setError("Something went wrong while assign deliveryboy.");
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      const response = await GetOrderByNumber(localData.order_number);

      if (response) {
        const { order, deliveryBoy, orderLines, vehicle, slots } = response;
        if (deliveryBoy) {
          order.delivery_boy_name = `${deliveryBoy.first_name} ${deliveryBoy.last_name}`;
          order.delivery_boy_mobile = deliveryBoy.phone;
          order.delivery_boy_ext = deliveryBoy.ext_id;
          order.delivery_pic = deliveryBoy.profile_pic;
        }
        console.log("vehicletype",vehicle)

        setLocalData(order || null);
        setLocalSlots(slots || null);
        setSuccessMessage("");
        setSelectedSlots([]);
        setSelectAll(false);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const updateStatusHandler = async (status, order_number) => {
    setLoading(true);
    const payload = {
      status,
      order_number,
    };
    try {
      const response = await UpdateStatus(payload);
      setSuccessMessage("Shift accepted");
      setLocalData((prevData) => ({
        ...prevData,
        order_status: status,
      }));
      setIsRefresh(true)
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
        const formattedDeliveryBoys = response.map((boy) => ({
          value: boy.id,
          label: boy.first_name + " " + boy.last_name,
          ext_id:boy.ext_id,
        }));
        setDeliveryBoys(formattedDeliveryBoys);
        setMasterDeliveryboy(response);
      } catch (error) {
        setDeliveryBoys([]);
        setMasterDeliveryboy([]);
      }
    };
    if (localData && !localData?.delivery_boy_name) {
      getDeliveryboyAvailable();
    }
    if (successMessage) {
      refreshData();
    }
  }, [localSlots, successMessage]);

  const handleDeliveryBoyChange = (selectedBoy) => {
    setSelectedDeliveryBoy(selectedBoy);
  };

  const groupSlots = () => {
    const groups = {};
    localSlots.forEach((slot) => {
      const key = `${slot.slot_date}-${slot.from_time}-${slot.to_time}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(slot);
    });
    return groups;
  };

  

  const groupedSlots = groupSlots();

  // Handle individual slot selection
  const handleSlotSelection = (id) => {
    setSelectedSlots((prev) =>
      prev.includes(id) ? prev.filter((slotId) => slotId !== id) : [...prev, id]
    );
  };

  // Handle "Select All" toggle
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const firstSlots = Object.values(groupedSlots)
        .map((group) => group.find((slot) => slot.ext_id === null || slot.delivery_boy_id === null))
        .filter((slot) => slot !== undefined) 
        .map((slot) => slot); 
      setSelectedSlots(firstSlots);
    } else {
      setSelectedSlots([]);
    }
  };
  
  useEffect(()=>{
    if(isResfresh){
      refreshData()
    }
  },[isResfresh])

  const assignDeliveryboyshifts = async () => {
    if (localData?.order_status === "REQUEST_PENDING") {
      alert("Before assigning, accept the shift.");
      return;
    }
    // Ensure at least one slot is selected
    if (selectedSlots.length === 0) {
      alert("Please select at least one slot.");
      return;
    }

    const deliveryBoyId = selectedDeliveryBoy.value;
    const requestPayload = {
        deliveryBoyId,
        orderNumber:localData.order_number,
        slots: selectedSlots?.map(slot => ({
            id: slot.id,
            slot_date: slot.slot_date,
            from_time: slot.from_time,
            to_time: slot.to_time
        }))
    };

  
    // Log the payload
    setLoading(true)
    try {
      const response = await assignMultipleDeliveryboyshift(requestPayload);
      setSuccessMessage("Delivery boy assigned successfully done.");
      setSelectAll(!selectAll);
    } catch (error) {
      console.log(error);
      setError("Something went wrong while assign deliveryboy.");
    } finally {
      setLoading(false);
    }
  };

  const assignDeliveryBoyToSlot = (slotId, deliveryboyId) => {
    const deliveryboy = masterDeliveryboy?.find(
      (deliveryboy) => deliveryboy.id == deliveryboyId
    );
    setSlotId(slotId);
    setExtId(deliveryboy.ext_id);
  };

  const getSelectedDeliveryboy = (deliveryboyId) => {
    const selectedBoy = deliveryBoys?.find(
      (boy) => boy.ext_id === deliveryboyId
    );
    return selectedBoy ? `${selectedBoy.label}` : "Not Assigned";
  };

  const updateEditDeliveryboy = (id, edit) => {
    setUpdateEdit(edit);
    setSlotRowId(id);
  };
  return (
    <>
      <div className="container mx-auto sm:p-5">
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
                          {localSlots?.length}
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
                          €{" "}
                          {localData?.hour_amount
                            ?((localData?.hour_amount * hours).toFixed(2))
                            : 0.0}
                        </h2>
                        <p className="text-gray-500 dark:text-white">
                          Aprox earning
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-gray-600 dark:text-white">
                      <p>
                        From{" "}
                        <b> {formatDate(localData?.shift_from_date, false)}</b>
                      </p>
                      <span>&rarr;</span>
                      <p>
                        To <b> {formatDate(localData?.shift_tp_date, false)}</b>
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
                  {/* <p
                    className={`text-center  rounded-full bg-opacity-10 px-1 py-1 text-sm font-medium ${
                      localData.order_status === "REQUEST_PENDING"
                        ? "bg-warning text-warning"
                        : "bg-success text-success"
                    }`}
                  >
                    {getStatus(localData?.order_status) || "Request"}
                  </p> */}
                </div>
                
                  <div className="mt-4">
                    <button
                      disabled={localData.order_status == "REQUEST_PENDING" ? false : true}
                      onClick={localData.order_status === "REQUEST_PENDING" ? () => updateStatusHandler("accepted", localData?.order_number) : undefined}
                      className={`w-full block text-center ${localData.order_status === "REQUEST_PENDING" ? "bg-blue-800 hover:bg-blue-900 dark:bg-blue-600" : "bg-success hover:bg-success dark:bg-success"}  text-white py-2 px-4 rounded-lg  `}
                    >
                     {localData.order_status === "REQUEST_PENDING" ? 'Accept' : getStatus(localData?.order_status) }
                    </button>

                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                     
                     onClick={()=>refreshData()}
                      className={`w-10 block text-center bg-blue-800 hover:bg-blue-900 dark:bg-blue-600 text-white p-2  rounded-lg  `}
                    >
                     <MdRefresh size={20} />
                    </button>

                  </div>
             
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
                <p class="text-lg font-medium p-2 text-success dark:text-white">
                  {successMessage && successMessage}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {selectedSlots.length > 0 && (
              <div className="flex justify-between items-center mt-4 mb-4 gap-2 w-100">
                <div className="w-full">
                  <Select
                    value={selectedDeliveryBoy}
                    onChange={handleDeliveryBoyChange}
                    fullWidth
                    isSearchable
                    options={deliveryBoys}
                  />
                </div>
                <div className="space-x-3">
                  <button
                    onClick={assignDeliveryboyshifts}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Assign
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    {localData?.order_status != "COMPLETED" && (
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    )}{" "}
                    Slot ID
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Slot Date
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Slot Day
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    From Time
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    To Time
                  </th>
                  <th className="text-center px-4 py-4 font-medium text-black dark:text-white">
                    Next Status
                  </th>
                  <th className="text-center px-4 py-4 font-medium text-black dark:text-white">
                    Assigned Delivery Boy
                  </th>
                  <th className="text-center px-4 py-4 font-medium text-black dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.values(groupedSlots).map((group, index) =>
                  group?.map((packageItem, key) => (
                    <tr key={packageItem.id} className={`${packageItem.ext_id && 'bg-green-500 text-white'}`}>
                      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <div className="flex gap-2">
                          {packageItem?.next_action_status != "Ended" &&
                          packageItem?.ext_id == null ? (
                            <input
                              type="checkbox"
                              checked={selectedSlots.includes(packageItem)}
                              onChange={() => handleSlotSelection(packageItem)}
                              disabled={selectAll && key !== 0}
                            />
                          ) : (
                            <FaCheck color="red" />
                          )}
                          <h5 className="font-medium  dark:text-white">
                            {index + 1}
                          </h5>
                        </div>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className=" dark:text-white">
                          {packageItem.slot_date == null
                            ? "N/A"
                            : formatDate(packageItem.slot_date,false)}
                        </p>
                        
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className=" dark:text-white">
                          {packageItem.day}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className=" dark:text-white">
                          {packageItem.from_time}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className=" dark:text-white">
                          {packageItem.to_time}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className=" text-center dark:text-white">
                          {packageItem.next_action_status}
                        </p>
                      </td>

                      <td className="text-center border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        {updateEdit && slotRowId == packageItem.id ? (
                          <Select
                            options={deliveryBoys}
                            defaultValue={
                              packageItem.ext_id
                                ? deliveryBoys?.find(
                                    (boy) =>
                                      boy.ext_id === packageItem.ext_id
                                  )
                                : null
                            }
                            onChange={(selectedOption) =>
                              assignDeliveryBoyToSlot(
                                packageItem.id,
                                selectedOption.value
                              )
                            }
                            isSearchable
                            placeholder="Select Delivery Boy"
                          />
                        ) : (
                          getSelectedDeliveryboy(packageItem.ext_id)
                        )}
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div className="mt-4 flex space-x-4">
                          {updateEdit && slotRowId == packageItem.id ? (
                            <div className="flex items-center space-x-3.5">
                              <button
                                onClick={handleStatusChange}
                                className="w-full text-center border border-red-500 text-red-500 p-2 rounded-lg hover:bg-red-100 dark:border-red-400 dark:hover:bg-red-700 dark:text-white "
                              >
                                Update
                              </button>
                              <button
                                onClick={() =>
                                  updateEditDeliveryboy(packageItem.id, false)
                                }
                                className="hover:text-primary bg-gray-200 dark:bg-boxdark p-2 rounded-full"
                              >
                                <MdClose size={17} color="red"/>
                              </button>
                            </div>
                          ) : packageItem?.next_action_status != "Ended" ? (
                            <div className="flex items-center space-x-3.5">
                              <button
                                onClick={() =>
                                  updateEditDeliveryboy(packageItem.id, true)
                                }
                                className={`hover:text-primary ${packageItem.ext_id ? 'bg-blue-300' : 'bg-gray-200'} dark:bg-boxdark p-2 rounded-full`}
                              >
                                <FaEdit size={17} />
                              </button>
                            </div>
                          ) : (
                            <button className="w-full text-center border border-gray-400 py-2 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white">
                              Done
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShiftOrder;
