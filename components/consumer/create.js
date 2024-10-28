"use client";

import React, { useState } from "react";
import SelectGroupTwo from "../SelectGroup/SelectGroupTwo";

function CreateNewUser() {
  const [selectedRole, setSelectedRole] = useState("");

  const roleOptions = [
    { label: "Pick & Drop-off", value: "pickup" },
    { label: "Delivery Boy", value: "deliveryboy" },
    { label: "Enterprise", value: "enterprise" },
  ];

  const industryOptions = [
    { label: "Restaurant and takeaway", value: "restaurant" },
    { label: "Grocery and speciality", value: "grocery" },
    { label: "Gift delivery", value: "gift" },
    { label: "Health and beauty", value: "health" },
    { label: "Tech and electronics", value: "electronics" },
    { label: "Retail and shopping", value: "shopping" },
    { label: "Professional services", value: "professional" },
    { label: "Other", value: "other" },
  ];

  const countryOptions = [
    { label: "France", value: "france" },
    { label: "India", value: "india" },
  ];

  const departmentOptions = [
    { label: "Ain", value: "ain" },
    { label: "Ain", value: "ain" },
  ];

  const communeOptions = [
    { label: "Ambérieu-en-Bugey", value: "ambérieu-en-bugey" },
    { label: "Ambérieu-en-Bugey", value: "ambérieu-en-bugey" },
  ];

  const cityOptions = [
    { label: "Siret", value: "siret" },
    { label: "Siret", value: "siret" },
  ];

  const vehicleOptions = [
    { label: "Cycle", value: "cycle" },
    { label: "Scooter", value: "scooter" },
    { label: "Car", value: "car" },
    { label: "Partner", value: "partner" },
    { label: "Van", value: "van" },
    { label: "Pickup", value: "pickup" },
    { label: "Truck", value: "truck" },
    { label: "Other", value: "other" },
  ];

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value); // Updated for handling select input event
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Create new user
      </h2>
      <div className="p-6 bg-white shadow-lg rounded-lg dark:border-strokedark dark:bg-boxdark">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Type here.."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="Type here.."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="Type here.."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Type here.."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Role
            </label>
            <select
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              onChange={handleRoleChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select role
              </option>
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {selectedRole === "enterprise" && (
            <>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Type here.."
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <SelectGroupTwo
                  label="Industry"
                  options={industryOptions}
                  defaultOption="select industry"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Deliveries/hours per month
                </label>
                <input
                  type="text"
                  placeholder="Type here.."
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <SelectGroupTwo
                  label="Country"
                  options={countryOptions}
                  defaultOption="select country"
                />
              </div>

              <div>
                <SelectGroupTwo
                  label="Department"
                  options={departmentOptions}
                  defaultOption="select department"
                />
              </div>

              <div>
                <SelectGroupTwo
                  label="Commune"
                  options={communeOptions}
                  defaultOption="select commune"
                />
              </div>

              <div>
                <SelectGroupTwo
                  label="City"
                  options={cityOptions}
                  defaultOption="select city"
                />
              </div>
            </>
          )}
          {selectedRole === "deliveryboy" && (
            <>
              <div>
                <SelectGroupTwo
                  label="Country"
                  options={countryOptions}
                  defaultOption="select country"
                />
              </div>

              <div>
                <SelectGroupTwo
                  label="Department"
                  options={departmentOptions}
                  defaultOption="select department"
                />
              </div>

              <div>
                <SelectGroupTwo
                  label="Commune"
                  options={communeOptions}
                  defaultOption="select commune"
                />
              </div>

              <div>
                <SelectGroupTwo
                  label="City"
                  options={cityOptions}
                  defaultOption="select city"
                />
              </div>

              <div>
                <SelectGroupTwo
                  label="Vehicle"
                  options={vehicleOptions}
                  defaultOption="select vehicle"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Vehicle registration document
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Driving license
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Vehicle insurance
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Passport
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-6">
          <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition">
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewUser;
