"use client";
import { useEffect, useState, useCallback } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LayoutPage from "@/components/Layouts/layout";
import MapComponent from "@/components/MapComponent";
import { FaEuroSign, FaPrint } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { formatDate, getAddressLine, useAuthToken } from "@/utils/constants";
import { GetOrderByNumber } from "@/services/order";
import Link from "next/link";
import BasicDetail from "@/components/order/views/orderdetail/basic-detail";
import BillingDetail from "@/components/order/views/orderdetail/billing-detail";
import AdditionDetail from "@/components/order/views/orderdetail/addition-detail";

const ViewOrder = ({ params }) => {
  const orderNumber = params?.id || "";
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const token=useAuthToken()
  const getOrder = useCallback(async () => {
    try {
      const orderData = await GetOrderByNumber(orderNumber,token);
      setOrder(orderData?.order || null);
    } catch (err) {
      console.error("Failed to fetch order data:", err);
      setError("Unable to load order details. Please try again later.");
    }
  }, [orderNumber]);

  useEffect(() => {
    if (orderNumber) getOrder();
  }, [orderNumber, getOrder]);

  if (error || order=='') {
    return <LayoutPage><div className="text-red-500">{error}</div></LayoutPage>;
  }

  return (
    <LayoutPage>
      <Breadcrumb pageName="Order Details" title="order" />
      <div className="flex gap-3 mb-4">
        {/* General Details Section */}
        <div className="w-2/4 rounded-lg bg-white border p-6 shadow-md dark:bg-boxdark">
          <h2 className="text-lg font-semibold mb-4">General Details</h2>
          <BasicDetail order={order}/>
        </div>

        {/* Billing Details Section */}
        <div className="w-2/4 rounded-lg bg-white border p-6 shadow-md dark:bg-boxdark">
          <h2 className="text-lg font-semibold mb-4 flex justify-between">
            <span>Billing Details</span>{" "}
            <button className="rounded bg-gray-100 p-2 dark:bg-boxdark   ">
              <FaPrint />
            </button>
          </h2>
          <BillingDetail order={order} userType="consumer"/>
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
    </LayoutPage>
  );
};

export default ViewOrder;
