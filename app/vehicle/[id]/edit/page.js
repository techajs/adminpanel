"use client"
// Ensure the path is correct
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LayoutPage from "@/components/Layouts/layout";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import useFetchGlobalData from "@/hooks/useFetchData";

const EditVehicle = ({ params }) => {
  const { vehicle, vehicleType } = useFetchGlobalData();
  const vehicleData = vehicle?.find(v => v.id === params?.id);
  return (
    <LayoutPage>
      <Breadcrumb pageName="Edit Vehicle" title="vehicle" />
      <div>
        <div className="p-10 mt-10 bg-white shadow-lg rounded-lg dark:border-strokedark dark:bg-boxdark relative">
          <div className="bg-black text-white p-2 px-4 rounded-md absolute -top-5">
            Vehicle Details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <SelectGroupTwo
                label="Vehicle Type"
                options={vehicleType || []}
                defaultOption="select vehicle"
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Vehicle No.
              </label>
              <input
                type="text"
                placeholder="Type here.."
                defaultValue={vehicleData?.vehicle_type} // Populate with existing data
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            {/* Add more fields as necessary, populating them with vehicleData */}
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-10 space-x-5">
            <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition">
              Save
            </button>
            <button className="bg-gray-400 text-white font-medium py-2 px-4 rounded hover:bg-gray-500 transition">
              Inactive User
            </button>
            <button className="bg-red-500 text-white font-medium py-2 px-4 rounded hover:bg-red-600 transition">
              Delete User
            </button>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default EditVehicle;
