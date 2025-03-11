import { formatDate, getAddressLine } from "@/utils/constants";
import React from "react";
import { FaEuroSign } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const EnterpriseBasicDetail = ({ order, orderLine }) => {
  if (order == "") {
    return (
      <div className="space-y-2">
        <p className="ml-5 mt-5">Data not found.</p>
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
      <p className="border-b-2 border-dotted border-gray-300 pb-2 gap-5 flex items-center">
        <strong>Is Repeat Mode:</strong>
        <span
          className={`ml-2 px-2 py-1 ${
            order?.paid_with == "Cash"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-success text-white"
          } rounded`}
        >
          {order?.is_repeat_mode == 1 ? "Yes" : "No"}
        </span>
        <strong>Repeat Every:</strong> {order?.repeat_every || "N/A"}
      </p>
      <p className="flex gap-5 border-b-2 border-dotted border-gray-300 pb-2">
        <strong>Repeat Mode :</strong> {order?.repeat_mode || "N/A"}{" "}
      </p>

      <p className="flex border-b-2 border-dotted gap-5 border-gray-300 pb-2">
        <strong>Repeat Until:</strong>{" "}
        {formatDate(order?.repeat_until) || "N/A"} <strong>Repeat Day:</strong>{" "}
        {order?.repeat_day || "N/A"}
      </p>

      <p className="flex gap-5 border-b-2 border-dotted border-gray-300 pb-2">
        <strong>Pickup Date:</strong> {formatDate(order?.pickup_date) || "N/A "}{" "}
        <strong>Pickup Time:</strong> {order?.pickup_time || "N/A"}
      </p>
      <p className="flex gap-5 border-b-2 border-dotted border-gray-300 pb-2 items-center">
        <strong>Payment Status:</strong>
        <span
          className={`ml-2 px-2 py-1 ${
            order?.paid_with == "Cash"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-success text-white"
          } rounded`}
        >
          {order?.paid_with == "Cash" ? "Paid" : "Paid"}
        </span>
        {/* <strong>Payment Method:</strong>
        <span className="ml-2 flex items-center gap-1 px-2 py-1 border border-dotted border-gray-400 rounded">
          <FaEuroSign />
          {order?.paid_with == "Cash" ? "Card" : order?.paid_with}
        </span> */}
      </p>
      <p className="border-b-2 border-dotted border-gray-300 pb-2 flex gap-5 items-center">
        <strong>Order Status:</strong>
        <span className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">
          {order?.consumer_order_title || "Pending"}
        </span>
        <strong>Service Type:</strong>
        <span className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded">
          {order?.service_name || "Pending"}
        </span>
      </p>

      <p className="border-b-2 border-dotted border-gray-300 pb-2 flex gap-5 items-center">
        <strong>Delivery Type:</strong>
        <span className="ml-2 px-2 py-1 bg-green-500 text-white rounded">
          {order?.delivery_type || "Pending"}
        </span>
        <strong>Ride Distance:</strong> {order?.distance?.toFixed(2) || "0"} Km
      </p>

      <h2 className="text-lg font-semibold mb-4 mt-5">{order?.delivery_type_id == 3 ? 'Branch Location':'Location Details'}</h2>
      <div className="timeline">
        {orderLine && orderLine.length > 0 ? (
          <>
            <div className="timeline-item">
              <div className="icon-circle start"></div>
              <div className="location-info">
                {getAddressLine(
                  order?.b_address,
                  order?.b_city,
                  order?.b_state,
                  order?.b_postal_code,
                  order?.b_country
                ) || "Start location unavailable"}
              </div>
            </div>
            <div className="timeline-line"></div>
            {orderLine.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="icon-circle end">
                  <FaLocationDot />
                </div>
                <div className="location-info">
                  {getAddressLine(
                    item?.dropoff_location_address,
                    item?.dropoff_location_city,
                    item?.dropoff_location_state,
                    item?.dropoff_location_postal_code,
                    item?.dropoff_location_country
                  ) || "End location unavailable"}
                </div>
              </div>
            ))}
          </>
        ) : order?.delivery_type_id == 3 ? (
          <>
            <div className="timeline-item">
              <div className="icon-circle end">
              <FaLocationDot />

              </div>
              <div className="location-info">
                {getAddressLine(
                  order?.pickup_location_address || order?.b_address,
                  order?.pickup_location_city || order?.b_city,
                  order?.pickup_location_state || order?.b_state,
                  order?.pickup_location_postal_code || order?.b_postal_code,
                  order?.pickup_location_country || order?.b_country
                ) || "Start location unavailable"}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="timeline-item">
              <div className="icon-circle start"></div>
              <div className="location-info">
                {getAddressLine(
                  order?.pickup_location_address || order?.b_address,
                  order?.pickup_location_city || order?.b_city,
                  order?.pickup_location_state || order?.b_state,
                  order?.pickup_location_postal_code || order?.b_postal_code,
                  order?.pickup_location_country || order?.b_country
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
          </>
        )}
      </div>
    </div>
  );
};

export default EnterpriseBasicDetail;
