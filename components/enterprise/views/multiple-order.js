import MapComponent from "@/components/MapComponent";
import AdditionDetail from "@/components/order/views/orderdetail/addition-detail";
import BasicDetail from "@/components/order/views/orderdetail/basic-detail";
import BillingDetail from "@/components/order/views/orderdetail/billing-detail";
import {
  baseProfilePicUrl,
  formatDate,
  getAddressLine,
} from "@/utils/constants";
import { handleDownload } from "@/utils/FileUtil";
import Link from "next/link";
import React from "react";
import { FaEuroSign, FaPrint } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import EnterpriseBasicDetail from "./common/basicdetail";
import EnterpriseAdditionDetail from "./common/additiondetail";

const MultipleOrder = ({ order, deliveryboy, vehicle, orderLine }) => {
  const locations = orderLine?.map((item) => ({
    lat: item?.dlatitude,
    long: item?.dlongitude,
  }));
  const clickHandler = (e) => {
    e.preventDefault();
    const invoiceUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/invoice/view/${order?.order_number}/enterprise`;
    handleDownload(invoiceUrl, "invoice.pdf");
  };
  return (
    <>
      <div className="flex gap-3 mb-4">
        <div className="w-2/4 rounded-lg bg-white border p-6 shadow-md dark:bg-boxdark">
          <h2 className="text-lg font-semibold mb-4">General Details</h2>
          <EnterpriseBasicDetail order={order} orderLine={orderLine} />
        </div>
        {/* Billing Details Section */}
        <div className="w-2/4 rounded-lg bg-white border p-6 shadow-md dark:bg-boxdark">
          <h2 className="text-lg font-semibold mb-4 flex justify-between">
            <span>Billing Details</span>{" "}
            <button
              type="button"
              onClick={clickHandler}
              className="rounded bg-gray-100 p-2 dark:bg-boxdark   "
            >
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
            <MapComponent
              latitude={order?.b_latitude}
              longitude={order?.b_longitude}
              dlatitude={order?.dlatitude}
              dlongitude={order?.dlongitude}
              multiple={true}
              locations={locations}
            />
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
            <div className="space-y-2">
              <EnterpriseAdditionDetail order={order} vehicle={vehicle} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultipleOrder;
