"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PageFilter from "@/components/common/page-filter";
import LayoutPage from "@/components/Layouts/layout";
import Add from "@/components/tables/add";
import { GetServiceType } from "@/services/servicetype/GetServiceType";
import { formatDate } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye, FaRegEdit } from "react-icons/fa";

const ServicesType = () => {
  const [pageSize, setPageSize] = useState("");
  const [serviceData, setServiceData] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const handlePageSize = (e) => {
    const newPageSize = e.target.value;
    setPageSize(newPageSize);
  };
  useEffect(() => {
    const getService = async () => {
      try {
        const servicedata = await GetServiceType(); // Ensure it's awaited
        setServiceData(servicedata);
      } catch (error) {
        setServiceData([]);
        console.error("Error fetching service data:", error);
      }
    };
    getService();
  }, []);
  return (
    <LayoutPage>
      <Breadcrumb pageName={"Service List"} />
      <div className="rounded-sm border border-stroke bg-white  px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="w-[355px] overflow-x-auto sm:w-full">
          {/* <div className="flex items-center justify-between mb-5">
            <div className="flex items-center w-1/2 justify-start space-x-5">
              <PageFilter
                selectedOption={pageSize}
                onPageChanges={handlePageSize}
              />
            </div>
            <div className="relative">
               <Add title="Create" url="/users/create/enterprise" />
            </div>
          </div> */}

          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  #
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  service Type
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Discount
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Created On
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceData.length > 0 ? (
                serviceData?.map((item, i) => (
                  <tr key={i}>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black text-sm dark:text-white">
                        {i + 1}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black text-sm dark:text-white">
                        {item.service_name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black text-sm dark:text-white">
                        {item.discount}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black text-sm dark:text-white">
                        {formatDate(item.created_on, true)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p
                        className={`text-center rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium mt-2 ${
                          item?.is_del === 0
                            ? "bg-success text-success"
                            : item?.is_active === 0
                            ? "bg-warning text-warning" // Style for waiting for approval
                            : "bg-danger text-danger"
                        }`}
                      >
                        {item?.is_del === 1 ? "Inactive" : "Active"}
                      </p>
                    </td>
                    <td className="border-b text-left border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <p
                          className={`inline-flex rounded-full bg-opacity-70 px-2 py-2 text-white text-sm font-medium bg-success `}
                        >
                          <Link href={`/services/${item.id}`}>
                            <FaRegEdit size={15} />
                          </Link>
                        </p>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    Data not found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-end mb-5 mt-5">
            <div className="flex items-center w-1/2 justify-end space-x-5 gap-3"></div>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default ServicesType;
