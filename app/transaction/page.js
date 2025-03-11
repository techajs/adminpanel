"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PageFilter from "@/components/common/page-filter";
import TabLayout from "@/components/common/tab-item";
import LayoutPage from "@/components/Layouts/layout";
import {useState } from "react";

const TransactionPage = () => {
 
  const [selectedTab, setSelectedTab] = useState("consumer");
  const [pageSize, setPageSize] = useState("");
  const tabs = [
    { id: "consumer", label: "Consumer" },
    { id: "enterprise", label: "Enterprise" },
    { id: "deliveryboy", label: "Delivery Boy" },
  ];

  const handlePageSize = (e) => {
    const newPageSize = e.target.value;
    setPageSize(newPageSize);
  };



 
  return (
    <LayoutPage>
      <Breadcrumb pageName={`Transaction List`} />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <TabLayout
        tabs={tabs}
        selectedTab={selectedTab}
        setSelected={setSelectedTab}
      />
      <div className="w-[395px] overflow-x-auto sm:w-full">
      <div className="flex justify-between items-center mb-4">
          <PageFilter
            selectedOption={pageSize}
            onPageChanges={handlePageSize}
          />
          <div className="flex items-center justify-between gap-2">
            
            <div className="relative">
              <button className="absolute left-3 top-1/2 -translate-y-1/2 dark:bg-meta-4 ">
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>
              <input
                className="min-w-[250px] rounded border border-stroke dark:bg-meta-4  bg-gray-200 text-sm py-1 pl-11.5 pr-4.5 text-black focus:border-secondary focus-visible:outline-none dark:text-white dark:focus:border-primary"
                type="text"
                name="seacrh"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4">
                sdf
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                User
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Amount
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
           
          </tbody>
        </table>
      </div>

      
    </div>
    </LayoutPage>
  );
};

export default TransactionPage;
