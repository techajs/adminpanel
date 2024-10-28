"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import LayoutPage from "@/components/Layouts/layout";

export default function VehiclePage() {
  const { data: session, status } = useSession();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [search, setSearch] = useState(""); // Search input
  const itemsPerPage = 5; // Items per page
  // const router =useRouter()
  useEffect(() => {
    const isLogin=()=>{
     
      if (status === "authenticated") {
        fetchVehicles(session.token);
      } else if (status === "unauthenticated") {
        // If the user is not authenticated, redirect them to the login page
        router.push("/login");
      }
    }

    isLogin()
    
  }, [status, session]);

  const fetchVehicles = async (token) => {
    try {
      const res = await fetch("http://localhost:3009/api/vehicletypes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });

      if (res.status === 401) {
        // If the status is 401, handle the unauthorized error
        setError("Unauthorized: Your session has expired. Please log in again.");
        signOut(); // Clear the session and redirect to the login page
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch vehicles");
      }

      const data = await res.json();
      if(data[0]._success){
        setVehicles(data[0]._response);
        setLoading(false);
      }
     
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading vehicles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  // Filter vehicles based on search input
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicle_type.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic: Slice the array of vehicles based on the current page
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  return (
    <LayoutPage>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle List</h1>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search vehicles..."
          className="border p-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Data Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Vehicle Name</th>
            <th className="py-2 px-4 border-b">Model</th>
            <th className="py-2 px-4 border-b">Year</th>
          </tr>
        </thead>
        <tbody>
          {paginatedVehicles.map((vehicle) => (
            <tr key={vehicle.id} className="text-center">
              <td className="py-2 px-4 border-b">{vehicle.vehicle_type}</td>
              <td className="py-2 px-4 border-b">{vehicle.model}</td>
              <td className="py-2 px-4 border-b">{vehicle.year}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-indigo-500 text-white rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>

        <span className="py-2">Page {currentPage} of {totalPages}</span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-indigo-500 text-white rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>

    </LayoutPage>
  );
}
