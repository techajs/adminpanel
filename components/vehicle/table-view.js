"use client";
import Pagination from "../pagination/page";
import TableItem from "../tables/table-items";
import PageFilter from "../common/page-filter";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { calculateTotalPages, paginate } from "@/utils/constants";
import useFetchGlobalData from "@/hooks/useFetchData";




const VehicleTableView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const {vehicle,fetchVehicle} = useFetchGlobalData();
  
  const refreshVehicleData = async () => {
    fetchVehicle(); // Fetches updated vehicle data from API
  };
  // Filter vehicles by search term
  const filteredVehicles =(vehicle || []).filter(
    (item) =>
      item.plat_no.toLowerCase().includes(search.toLowerCase()) ||
      item.make.toLowerCase().includes(search.toLowerCase()) ||
      item.vehicle_type.toLowerCase().includes(search.toLowerCase()) ||
      item.model.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = calculateTotalPages(filteredVehicles.length, itemsPerPage);
  const currentItems = paginate(filteredVehicles, currentPage, itemsPerPage);

  const handleSearchChange = useCallback(
    debounce((e) => {
      const newSearch = e.target.value;
      setSearch(newSearch);
    }, 300),
    [search]
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSize = (e) => {
    const newPageSize = parseInt(e.target.value, 10);
    setItemsPerPage(newPageSize);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center w-1/2 justify-start space-x-5">
            <PageFilter selectedOption={itemsPerPage} onPageChanges={handlePageSize} />
          </div>
          <div className="relative">
            <button className="absolute left-3 top-1/2 -translate-y-1/2 dark:bg-meta-4">
              <svg className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z" fill="" />
                <path fillRule="evenodd" clipRule="evenodd" d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z" fill="" />
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

        <TableItem data={currentItems} url="/vehicle" refreshData={refreshVehicleData} />
        <div className="flex items-center justify-end mb-5 mt-5">
          <div className="flex items-center w-1/2 justify-end space-x-5 gap-5">
            {totalPages > 1 && (<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleTableView;
