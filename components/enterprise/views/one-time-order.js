import MapComponent from "@/components/MapComponent";
import AdditionDetail from "@/components/order/views/orderdetail/addition-detail";
import BasicDetail from "@/components/order/views/orderdetail/basic-detail";
import BillingDetail from "@/components/order/views/orderdetail/billing-detail";
import React from "react";
import { FaPrint } from "react-icons/fa";
const OnetimeOrder = ({ order, deliveryboy, vehicle, orderLine }) => {
  return (
    <>
      <div className="flex gap-3 mb-4">
        <div className="w-2/4 rounded-lg bg-white border p-6 shadow-md dark:bg-boxdark">
          <h2 className="text-lg font-semibold mb-4">General Details</h2>
          <BasicDetail order={order} />
        </div>
        {/* Billing Details Section */}
        <div className="w-2/4 rounded-lg bg-white border p-6 shadow-md dark:bg-boxdark">
          <h2 className="text-lg font-semibold mb-4 flex justify-between">
            <span>Billing Details</span>{" "}
            <button className="rounded bg-gray-100 p-2 dark:bg-boxdark   ">
              <FaPrint />
            </button>
          </h2>
          <BillingDetail order={order} userType="enterprise" />
        </div>
      </div>
      <div className="flex gap-3">
        {/* Map and Location Section */}
        <div className="w-2/4">
          <div className="rounded-lg bg-white border p-6 shadow-md mb-4 dark:bg-boxdark">
            <h2 className="text-lg font-semibold mb-4">Map View</h2>
            <MapComponent latitude={order?.latitude} longitude={order?.longitude}dlatitude={order?.dlatitude} dlongitude={order?.dlongitude} />
          </div>
        </div>

        {/* Price Details Section */}
        <div className="w-2/4 space-y-2">
          <div className="rounded-lg bg-white border p-6 shadow-md dark:bg-boxdark">
            <h2 className="text-lg font-semibold mb-4">Price Details</h2>
            <div className="flex justify-between">
              <span>Total Amount</span>
              <span>{order?.amount.toFixed(2) || "0.00 "} €</span>
            </div>
          </div>

          {/* Additional Section */}
          <div className="rounded-lg bg-white border p-6 shadow-md dark:bg-boxdark">
            <h2 className="text-lg font-semibold mb-4">Additional Details</h2>
            <AdditionDetail order={order}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnetimeOrder;
