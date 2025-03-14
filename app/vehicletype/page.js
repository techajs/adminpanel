"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PageFilter from "@/components/common/page-filter";
import LayoutPage from "@/components/Layouts/layout";
import Pagination from "@/components/pagination/page";
import TableItem from "@/components/tables/table-items";
import Waiting from "@/components/common/waiting";
import { GetVehicleTypes } from "@/server";

const VehicleTypes = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [vehicleType, setVehicleType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [pageSize, setPageSize] = useState(searchParams.get("pageSize") || 10);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0,
  });

  const fetchVehicleTypes = useCallback(async () => {
    setLoading(true);
    try {
      const page = searchParams.get("page") || 1;
      const currentSearch = searchParams.get("search") || "";
      const res = await GetVehicleTypes(page, currentSearch, pageSize);
      if (res?._success) {
        setVehicleType(res._response.data);
        setPagination({
          total: res._response.total,
          page: res._response.page,
          totalPages: res._response.totalPages,
        });
      } else {
        setVehicleType([]);
        setPagination({ total: 0, page: 1, totalPages: 0 });
      }
    } catch (error) {
      console.error("Error fetching vehicle types:", error);
    } finally {
      setLoading(false);
    }
  }, [searchParams, pageSize]);

  useEffect(() => {
    fetchVehicleTypes();
  }, [fetchVehicleTypes]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.replace(`${pathname}?${params}`);
  };

  const handlePageSize = (e) => {
    const newPageSize = e.target.value;
    setPageSize(newPageSize);
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", newPageSize);
    router.replace(`${pathname}?${params}`);
  };

  const handleSearchChange = useCallback(
    debounce((e) => {
      const newSearch = e.target.value;
      setSearch(newSearch);
      const params = new URLSearchParams(searchParams);
      if (newSearch) {
        params.set("search", newSearch);
      } else {
        params.delete("search");
      }
      router.replace(`${pathname}?${params}`);
    }, 300),
    [searchParams, pathname]
  );

  const refreshVehicleData = () => {};

  return (
    <LayoutPage>
      <Breadcrumb pageName="Vehicle Types" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="w-[355px] overflow-x-auto sm:w-full">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center w-1/2 justify-start space-x-5">
              <PageFilter
                selectedOption={pageSize}
                onPageChanges={handlePageSize}
              />
            </div>
            <div className="relative">
              <button className="absolute left-3 top-1/2 -translate-y-1/2 dark:bg-meta-4">
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
                className="min-w-[380px] rounded border border-stroke dark:bg-meta-4 bg-gray-200 text-sm py-1 pl-11.5 pr-4.5 text-black focus:border-secondary focus-visible:outline-none dark:text-white dark:focus:border-primary"
                type="text"
                name="search"
                placeholder="Search..."
                defaultValue={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {loading ? (
            <Waiting />
          ) : (
            <TableItem
              data={vehicleType}
              url="/vehicletype"
              refreshData={refreshVehicleData}
            />
          )}
          <div className="flex items-center justify-end mb-5 mt-5">
            <div className="flex items-center w-1/2 justify-end space-x-5 gap-5">
              {pagination.totalPages > 1 && (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default VehicleTypes;
