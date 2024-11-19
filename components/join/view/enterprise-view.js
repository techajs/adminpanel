"use clientyy";
import { useState } from "react";
import JoinRequestRejectionModal from "../modal/reject-modal";
import ActionButtion from "./action-view";
import { ChangeStatus } from "@/services/joinrequest/join";
import { getRole } from "@/utils/constants";
// Make sure to import the API function

export default function EnterpriseView({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [successmessage, setSuccessmessage] = useState(null);
  const [reason, setReason] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const submitHandler = async (reason) => {
    try {
      const response = await ChangeStatus(
        data.role,
        "REJECTED",
        data.enterpriseId,
        reason
      );
      setSuccessmessage("Rejection submitted successfully");
      setError(null); // Clear any existing errors
    } catch (error) {
      setError("Failed to submit rejection. Please try again.");
    }
  };

  return (
    <div className="p-7 bg-white shadow-lg rounded-lg dark:border-strokedark dark:bg-boxdark">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Account Type */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            User Type
          </p>
          <span className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium bg-success text-success mt-2">
            {getRole(data?.role)}
          </span>
        </div>
        {/* Full Name */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Full Name
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.first_name} {data?.last_name}
          </h5>
        </div>

        {/* Email */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Email
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.email}
          </h5>
        </div>

        {/* Phone */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Phone
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.phone}
          </h5>
        </div>

        {/* Company name  */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Company name
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.company_name}
          </h5>
        </div>

        {/* Industry  */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Industry
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.industry_type}
          </h5>
        </div>

        {/* Deliveries per month  */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Deliveries per month
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.deliveryMonthHours || "not given"}
          </h5>
        </div>

        {/* Country */}
        <div yclassName="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Country
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.country}
          </h5>
        </div>

        {/* Department */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            State
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.state}
          </h5>
        </div>
        {/* City  */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            City
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.city}
          </h5>
        </div>
        {/* siret no  */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Siret No
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.siret_no}
          </h5>
        </div>

        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Status
          </p>
          <span
            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
              data.status === "Active"
                ? "bg-success text-success"
                : data.status === "Rejected"
                ? "bg-danger text-danger"
                : "bg-warning text-warning"
            }`}
          >
            {data?.status}
          </span>
        </div>

        {/* Projects description  */}
        <div className="col-span-3">
          <p className="text-sm font-regular text-black dark:text-white">
            Projects description
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.description}
          </h5>
        </div>
        {data?.is_active === 2 && (
          <div className="flex items-center  mt-4 gap-2">
            <span className="text-sm">Reason :</span>
            <spen>{data?.ereason}</spen>
          </div>
        )}
      </div>

      <ActionButtion
        onChange={openModal}
        role={data.role}
        status="ACCEPTED"
        ext_id={data.enterpriseId}
        reason={data?.ereason}
        isShow={data?.status || "Pending"}
      />
      <JoinRequestRejectionModal
        showModal={showModal}
        closeModal={closeModal}
        reason={reason}
        setReason={setReason}
        submitHandler={submitHandler}
      />
      {error && <p className="text-red-500">{error}</p>}
      {successmessage && <p className="text-green-500">{successmessage}</p>}
    </div>
  );
}
