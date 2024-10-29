import { formatDate, getAddressLine } from "@/utils/constants";
import React from "react";
import { FaEuroSign } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const BasicDetail = ({ order }) => {
  if (order == "") {
    return (
      <div className="space-y-2">
        <p className="ml-5 mt-5">
          Data not found.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <p className="border-b-2 border-dotted border-gray-300 pb-2">
        <strong>Order Id:</strong> {order?.order_number || "N/A"}
      </p>
      <p className="border-b-2 border-dotted border-gray-300 pb-2">
        <strong>Date Created:</strong> {formatDate(order?.created_on) || "N/A"}
      </p>
      <p className="border-b-2 border-dotted border-gray-300 pb-2 flex items-center">
        <strong>Payment Status:</strong>
        <span
          className={`ml-2 px-2 py-1 ${
            order?.paid_with == "Cash"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-success text-white"
          } rounded`}
        >
          {order?.paid_with == "Cash" ? "Not Paid" : "Paid"}
        </span>
      </p>
      <p className="border-b-2 border-dotted border-gray-300 pb-2 flex items-center">
        <strong>Payment Method:</strong>
        <span className="ml-2 flex items-center gap-1 px-2 py-1 border border-dotted border-gray-400 rounded">
          <FaEuroSign />
          {order?.paid_with == "Cash" ? "Cash on Delivery" : order?.paid_with}
        </span>
      </p>
      <p className="border-b-2 border-dotted border-gray-300 pb-2 flex items-center">
        <strong>Order Status:</strong>
        <span className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">
          {order?.consumer_order_title || "Pending"}
        </span>
      </p>
      <p>
        <strong>Ride Distance:</strong> {order?.distance.toFixed(2) || "0"} Km
      </p>
      <h2 className="text-lg font-semibold mb-4 mt-5">Location Details</h2>
      <div className="timeline">
        <div className="timeline-item">
          <div className="icon-circle start"></div>
          <div className="location-info">
            {getAddressLine(
              order?.pickup_location_address,
              order?.pickup_location_city,
              order?.pickup_location_state,
              order?.pickup_location_postal_code,
              order?.pickup_location_country
            ) || "Start location unavailable"}
          </div>
        </div>
        <div className="timeline-line"></div>
        <div className="timeline-item">
          <div className="icon-circle end">
            <FaLocationDot />
          </div>
          <div className="location-info">
            {getAddressLine(
              order?.dropoff_location_address,
              order?.dropoff_location_city,
              order?.dropoff_location_state,
              order?.dropoff_location_postal_code,
              order?.dropoff_location_country
            ) || "End location unavailable"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetail;
