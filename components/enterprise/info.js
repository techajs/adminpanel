"use client";
import { useState } from "react";
import TabLayout from "../common/tab-item";
import BaseViewTable from "../tables/views/base-table";
import UserInfo from "../user-info";
import {
  getValidImageUrl,
  maskEmail,
  maskPhoneNumber,
} from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const EnterpriseInfo = ({ data }) => {
  const maskedEmail = maskEmail(data?.email || "N/A");
  const maskedPhoneNumber = maskPhoneNumber(data?.phone || "N/A");
  const [selectedTab, setSelectedTab] = useState("ride"); // Default selected tab
  const tabs = [
    { id: "ride", label: "Order List" },
  ];
  return (
    <div className="flex gap-6">
      {/* Left Column - Profile Info */}
      <div className="w-1/4 rounded-lg">
        <div
          className=" bg-boxdark dark:border-strokedark dark:bg-boxdark p-6 rounded-lg"
          style={{ height: "375px" }}
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
              {data?.first_name || "unknow"} {data?.last_name}{" "}
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

          {/* Contact Info */}
          <div className="mt-4 text-white">
            <div className="flex items-center gap-2">
              <span className="text-sm">📧 {maskedEmail}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm">📞 {maskedPhoneNumber}</span>
            </div>
            <div className="flex items-center justify-end gap-2 mt-2">
              <Link  href={`/enterprise/${data?.ext_id}/edit`} className="text-sm text-primary"><FaEdit size={25}/></Link>
              <span className="text-sm">Edit</span>
            </div>  
          </div>
        </div>
        <div>
          <UserInfo data={data} userType="enterprise" />
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
            extId={data?.ext_id}
            datatype={selectedTab}
            userType="enterprise"
          />
        </div>
      </div>
    </div>
  );
};

export default EnterpriseInfo;
