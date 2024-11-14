"use client";

import {
  payoutHeader,
  rideConsumer,
  rideHeader,
  walletHeader,
  documentHeader,
} from "@/utils/constants";
import ListItem from "./item-list";
import { GetOrderById } from "@/services/consumer";
import { useEffect, useState, useMemo, useCallback } from "react";
import { getOrderByDeliveryboyEXT } from "@/services/deliveryboy";
import { getOrderByInterpriseEXT } from "@/services/enterprise";
import PageFilter from "@/components/common/page-filter";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import Pagination from "@/components/pagination/page";

const BaseViewTable = ({ extId, datatype, userType }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [order, setOrder] = useState([]);
  const [pageSize, setPageSize] = useState("");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const headersMap = {
    ride: {
      deliveryboy: rideHeader(),
      consumer: rideConsumer(),
      enterprise: rideConsumer(),
    },
    wallet: walletHeader(),
    payout: payoutHeader(),
    document: documentHeader(),
  };

  const orderMap = {
    deliveryboy: (currentSearch, pageSize, extId) =>
      getOrderByDeliveryboyEXT(currentSearch, pageSize, extId),
    consumer: (currentSearch, pageSize, extId) =>
      GetOrderById(currentSearch, pageSize, extId),
    enterprise: (currentSearch, pageSize, extId) =>
      getOrderByInterpriseEXT(currentSearch, pageSize, extId), // Ensure extId is passed here
  };

  const header =
    datatype === "ride" ? headersMap[datatype][userType] : headersMap[datatype];

  // Get the correct order fetching function based on userType
  const getOrderList = useMemo(() => orderMap[userType], [userType]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const currentSearch = searchParams.get("search") || "";
        const orderList = await getOrderList(currentSearch, pageSize, extId); // Pass extId here
        setOrder(orderList);
      } catch (error) {
        console.error("Error fetching order list:", error);
      }
    };
    fetchOrder();
  }, [searchParams, getOrderList, pageSize, extId]); // Added extId as a dependency

  const handleSearchChange = useCallback(
    debounce((e) => {
      const newSearch = e.target.value;
      setSearch(newSearch);
      const params = new URLSearchParams(searchParams);
      if (e.target.value) {
        params.set("search", newSearch);
        setPageSize(0);
      } else {
        params.delete("search");
      }
      router.replace(`${pathname}?${params}`);
    }, 300),
    [searchParams, pathname]
  );

  const handlePageSize = (e) => {
    const newPageSize = e.target.value;
    setPageSize(newPageSize);
    if (newPageSize) {
      const params = new URLSearchParams(searchParams);
      params.delete("search");
      router.replace(`${pathname}?${params}`);
    }
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params}`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <PageFilter selectedOption={pageSize} onPageChanges={handlePageSize} />
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
            name="search"
            placeholder="Search..."
            defaultValue={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-center border-b">
            {header?.map((item, key) => (
              <th key={key} className="font-medium text-black dark:text-white">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <ListItem data={order} datatype={datatype} userType={userType} />
        </tbody>
      </table>
      <div className="flex items-center justify-end mb-5 mt-5">
        <div className="flex items-center w-1/2 justify-end space-x-5 gap-3">
          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BaseViewTable;
