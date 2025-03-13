"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PageFilter from "@/components/common/page-filter";
import TabLayout from "@/components/common/tab-item";
import LayoutPage from "@/components/Layouts/layout";
import Pagination from "@/components/pagination/page";
import EnterpriseOrderItem from "@/components/tables/enterpriseOrderItem";
import OrderStatus from "@/components/tables/order-status";
import { getAvailableDeliveryboy } from "@/server/deliveryboy";
import { getEnterpriseOrder } from "@/server/order";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const EnterprirseOrderPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [deliveryBoys, setDeliveryBoys] = useState(null);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const [selectedTab, setSelectedTab] = useState("onetime");

  const tabs = [
    { id: "onetime", label: "One Time Order" },
    { id: "multipleorder", label: "Multiple Delivery" },
    { id: "shift", label: "Shift Order" },
  ];

  const fetchOrderList = useCallback(async () => {
    setLoading(true);
    try {
      const page = searchParams.get("page") || 1;
      const currentSearch = searchParams.get("search") || "";

      const res = await getEnterpriseOrder(
        page,
        currentSearch,
        selectedTab,
        pageSize,
        status
      );
      const response=res?._response;
      setOrder(response?.data || []);
      setPagination({
        total: response?.total || 0,
        page: response?.page || 1,
        pageSize: response?.pageSize || 10,
        totalPages: response?.totalPages || 0,
      });
    } catch (error) {
      setOrder([]);
      setPagination({
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [searchParams, selectedTab, pageSize, status]);

  useEffect(() => {
    fetchOrderList();
  }, [searchParams, selectedTab, pageSize, status]);

  const handleSearchChange = useCallback(
    debounce((e) => {
      const newSearch = e.target.value;
      setSearch(newSearch);
      const params = new URLSearchParams(searchParams);
      if (newSearch) {
        params.set("search", newSearch);
        setPageSize(10);
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
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    router.replace(`${pathname}?${params}`);
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
  const statusData = [
    { value: "current", label: "On Going" },
    { value: "past", label: "Past" },
  ];
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    params.delete("search");
    router.replace(`${pathname}?${params}`);
  };

  useEffect(() => {
    const getDeliveryboyAvailable = async () => {
      try {
        const response = await getAvailableDeliveryboy();
        setDeliveryBoys(response);
      } catch (error) {
        setDeliveryBoys([]);
      }
    };
    getDeliveryboyAvailable();
  }, []);
  const assignerHandler = async (e, id,orderNumber) => {
    let extId = e;
    const payload = {
      order_number: orderNumber,
      delivery_boy_ext_id: extId,
      id,
    };
  };
  return (
    <LayoutPage>
      <Breadcrumb pageName="Enterprise Order List" />
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
            <OrderStatus
              selectedOption={status}
              onPageChange={handleStatusChange}
              selectValue={statusData}
            />
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
                defaultValue={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <EnterpriseOrderItem
          data={order}
          url="/enterprise/order"
          loading={loading}
          deliveryboy={deliveryBoys}
          handleStatusChange={assignerHandler}
          type={selectedTab}
        />
        {!loading && (
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
        )}
      </div>
    </LayoutPage>
  );
};

export default EnterprirseOrderPage;
