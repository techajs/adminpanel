"use client";
import { getCommonlist } from "@/app/_lib/action";
import PageFilter from "@/components/common/page-filter";
import LayoutPage from "@/components/Layouts/layout";
import { API } from "@/utils/constants";
import { useEffect, useState } from "react";
export default function BillingReports() {
  const [filters, setFilters] = useState({
    enterprise_id: "",
    order_type: "",
    billing_type: "",
    status: "",
    start_date: "",
    end_date: "",
  });

  const [billingData, setBillingData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit,setLimit]=useState(10)

  useEffect(() => {
    fetchBillingReports();
    
  }, [filters, page,limit]);

  const fetchBillingReports = () => {
    getCommonlist(
      API.getBillingUrl, // API endpoint
      { ...filters, page, limit }, // Passing filters & pagination
      (response) => {
        if (response[0]._success) {
          setBillingData(response[0]?._response?.data || []);
          setTotalPages(
            Math.ceil(response[0]?._response?.total_orders / limit)
          );
        }
      },
      (errorResponse) => {
        console.error(
          "Error fetching billing reports:",
          errorResponse?.data[0]
        );
      }
    );
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageSize = (e) =>{
    const newPageSize = e.target.value;
    setLimit(newPageSize);
  }
  

  return (
    <LayoutPage>
      <div className="container mx-auto p-6 text-black dark:text-white dark:bg-boxdark ">
        <h1 className="text-2xl font-bold mb-4">Billing Reports</h1>
        {/* Filters Section */}
        <div className="grid grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg shadow-md dark:bg-boxdark ">
          <input
            type="text"
            name="enterprise_id"
            placeholder="Enterprise ID"
            className="border p-2 rounded w-full dark:bg-boxdark"
            onChange={handleFilterChange}
          />
          <select
            name="order_type"
            className="border p-2 rounded w-full dark:bg-boxdark"
            onChange={handleFilterChange}
          >
            <option value="">All Order Types</option>
            <option value="ontime">Ontime</option>
            <option value="multiple_delivery">Multiple Delivery</option>
            <option value="shift_order">Shift Order</option>
          </select>
          <select
            name="billing_type"
            className="border p-2 rounded w-full dark:bg-boxdark"
            onChange={handleFilterChange}
          >
            <option value="">All Billing Types</option>
            <option value="pay_later">Pay Later</option>
            <option value="shift_slot">Shift Slot</option>
          </select>
          <select
            name="status"
            className="border p-2 rounded w-full dark:bg-boxdark"
            onChange={handleFilterChange}
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <input
            type="date"
            name="start_date"
            className="border p-2 rounded w-full dark:bg-boxdark"
            onChange={handleFilterChange}
          />
          <input
            type="date"
            name="end_date"
            className="border p-2 rounded w-full dark:bg-boxdark"
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex  mt-6 justify-between">
          {/* <button className="bg-green-500 text-white px-4 py-2 rounded">
    Download CSV
  </button> */}
            <PageFilter selectedOption={limit} onPageChanges={handlePageSize} />

          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Download PDF
          </button>
        </div>
        {/* Table Section */}
        <div className="mt-6 w-[355px] overflow-x-auto sm:w-full">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200 dark:bg-meta-4">
              <tr>
                <th className="border p-2">Order #</th>
                <th className="border p-2">Enterprise</th>
                <th className="border p-2">Order Type</th>
                <th className="border p-2">Billing Type</th>
                <th className="border p-2">Total Amount</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {billingData.length > 0 ? (
                billingData.map((order) => (
                  <tr key={order.order_id} className="text-center">
                    <td className="border p-2">{order.order_number}</td>
                    <td className="border p-2">{order.enterprise_name}</td>
                    <td className="border p-2">{order.order_type}</td>
                    <td className="border p-2">{order.billing_type}</td>
                    <td className="border p-2">
                      {order?.total_order_amount?.toFixed(2)} €
                    </td>
                    <td
                      className={`border p-2 font-bold ${
                        order.status === "COMPLETED"
                          ? "text-green-600"
                          : order.status === "PENDING"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="border p-2">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            className=
            {`px-3 py-1 mx-1  dark:bg-meta-4 rounded ${
              page === 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
          }`}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span  className="px-3 py-2 mx-1">
            Page {page} of {totalPages}
                        
                    </span>
          
          <button
            className=
            {`px-3 py-1 mx-1 bg-gray-200  dark:bg-meta-4 rounded ${
              page === totalPages
                  ? 'cursor-not-allowed opacity-50'
                  : ''
          }`}
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </LayoutPage>
  );
}
