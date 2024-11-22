"use client";
import Link from "next/link";
import React, { useState } from "react";
import { getAvailableDeliveryboy } from "@/services/deliveryboy";
import { getValidImageUrl } from "@/utils/constants";
import Image from "next/image";
import ListDeliveryboy from "@/components/order/views/orderdetail/delivery-list";

const EnterpirseBillingDetail = ({ order, userType }) => {
  const [deliveryBoys, setDeliveryBoys] = useState(null);
  if (order == "") {
    return (
      <div className="space-y-2">
        <p className="ml-5 mt-5">Data not found.</p>
      </div>
    );
  }
  const handleStatusChange = (e) => {
    console.log(e.target.value);
  };
 

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
          {order?.delivered_otp ? order.delivered_otp : order?.otp || "N/A"}
        </span>
      </p>

      <h2 className="text-lg font-semibold mb-4">Delivery Boy Details</h2>
      
      <p className="border-b-2 border-dotted border-gray-300 pb-2 flex justify-start gap-3">
        <strong>Delivery Boy Name: </strong>

        {order?.delivery_boy_name ? (
          <div className="flex items-center justify-start gap-2">
          {/* <div className="bg-green-500 w-16 h-16 rounded-full  mb-4">
            {order?.delivery_pic ? (
              <Image
                src={getValidImageUrl(order?.delivery_pic)}
                alt={`${order.delivery_boy_name}`}
                className="w-full h-full rounded-full object-cover"
                width={30}
                height={30}
              />
            ) : (
              <span className="text-2xl text-white font-bold">
                {order?.delivery_boy_name
                  ? order.delivery_boy_name.charAt(0).toUpperCase()
                  : "D"}
              </span>
            )}
          </div> */}
  
          <Link
            href={`/deliveryboy/${order?.delivery_boy_ext}`}
            className="text-primary"
          >
            {order?.delivery_boy_name}
          </Link>
        </div>
        ) : "N/A"}
      </p>
      <p className="border-b-2 border-dotted border-gray-300 pb-2">
        <strong>Phone:</strong> {order?.delivery_boy_mobile || "N/A"}
      </p>
    </div>
  );
};

export default EnterpirseBillingDetail;
