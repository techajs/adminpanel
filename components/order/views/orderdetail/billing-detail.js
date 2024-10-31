
import Link from "next/link";
import React from "react";

const BillingDetail = ({ order,userType }) => {
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
        <strong>Name:</strong>{" "}
        <Link
          href={`/${userType}/${order?.consumer_ext}`}
          className="text-primary"
        >
          {order?.consumer_name || "N/A"}
        </Link>
      </p>
      <p className="border-b-2 border-dotted border-gray-300 pb-2">
        <strong>Company Name :</strong> {order?.company_name || "N/A"}
      </p>
      <p className="border-b-2 border-dotted border-gray-300 pb-2">
        <strong>Phone:</strong> {order?.consumer_mobile || "N/A"}
      </p>

      <p className=" border-dotted border-gray-300 pb-2 flex items-center">
        <strong>OTP:</strong>
        <span className="ml-2 flex items-center gap-1 px-2 py-1 border border-dotted border-gray-400 rounded">
          {order?.delivered_otp || "N/A"}
        </span>
      </p>

      <h2 className="text-lg font-semibold mb-4">Delivery Boy Details</h2>
      <p className="border-b-2 border-dotted border-gray-300 pb-2">
        <strong>Delivery Boy Name:</strong>
        <Link
          href={`/deliveryboy/${order?.delivery_boy_ext}`}
          className="text-primary"
        >
          {" "}
          {order?.delivery_boy_name || "N/A"}
        </Link>
      </p>
      <p className="border-b-2 border-dotted border-gray-300 pb-2">
        <strong>Phone:</strong> {order?.delivery_boy_mobile || "N/A"}
      </p>
    </div>
  );
};

export default BillingDetail;
