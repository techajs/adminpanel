"use client";
import { useState } from "react";
import JoinRequestRejectionModal from "../modal/reject-modal";
import ActionButtion from "./action-view";
import { ChangeStatus } from "@/services/joinrequest/join.";
import { getRole } from "@/utils/constants";

export default function ConsumerView({ data }) {
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

        {/* Country */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Country
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.country}
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
      </div>

      <ActionButtion
        onChange={openModal}
        role={data.role}
        status="ACCEPTED"
        ext_id={data.consumerId}
        reason=""
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
