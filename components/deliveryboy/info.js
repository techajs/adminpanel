"use client";
import { getValidImageUrl, maskEmail, maskPhoneNumber } from "@/utils/constants";
import { useState } from "react";
import TabLayout from "../common/tab-item";
import UserInfo from "../user-info";
import BaseViewTable from "../tables/views/base-table";
import Image from "next/image";

const DeliveryboyInfo = ({ data }) => {
  const maskedEmail = maskEmail(data?.email || "N/A");
  const maskedPhoneNumber = maskPhoneNumber(data?.phone || "N/A");
  const [selectedTab, setSelectedTab] = useState("ride"); // Default selected tab
  const tabs = [
    { id: "ride", label: "Ride List" },
    { id: "wallet", label: "Wallet Transactions" },
    { id: "payout", label: "Payout Requests" },
  ];
  return (
    <div className="flex gap-6">
      {/* Left Column - Profile Info */}
      <div className="w-1/4 rounded-lg">
        <div
          className=" bg-boxdark dark:border-strokedark dark:bg-boxdark p-6 rounded-lg"
          style={{ height: "350px" }}
        >
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              {data?.profile_pic ? (
                <Image
                  src={getValidImageUrl(data?.profile_pic)}
                  alt={`${data.first_name} ${data.last_name}`}
                  className="w-full h-full rounded-full object-cover"
                  width={60}
                  height={60}
                />
              ) : (
                <span className="text-2xl text-white font-bold">
                  {data?.first_name
                    ? data.first_name.charAt(0).toUpperCase()
                    : "U"}
                   
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-white">
              {" "}
              {data?.first_name || "unknow" } {data?.last_name}{" "}
            </h2>
            <span className="bg-yellow-500 text-black px-2 py-1 rounded-full mt-2">
              ★ 0.0
            </span>
          </div>

          {/* Wallet Balance */}
          <div className="mt-4">
            <p className="font-semibold text-white">
              Wallet Balance: <span className="text-yellow-400">$0.00</span>
            </p>
          </div>

          {/* Add Wallet Button */}
          <button className="bg-green-500 text-white mt-4 px-4 py-2 rounded-lg w-full">
            + Add Wallet Amount
          </button>

          {/* Contact Info */}
          <div className="mt-4 text-white">
            <div className="flex items-center gap-2">
              <span className="text-sm">📧 {maskedEmail}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm">📞 {maskedPhoneNumber}</span>
            </div>
          </div>
        </div>
        <div>
          <UserInfo data={data} userType="deliveryboy" />
        </div>
      </div>
      {/* left side content */}
      <div
        className="w-3/4 rounded-sm border border-stroke bg-white  px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
        style={{ height: "auto" }}
      >
        <div className="max-w-full overflow-x-auto">
          <TabLayout
            tabs={tabs}
            selectedTab={selectedTab}
            setSelected={setSelectedTab}
          />
          <BaseViewTable
            data={data}
            datatype={selectedTab}
            userType="deliveryboy"
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryboyInfo;
