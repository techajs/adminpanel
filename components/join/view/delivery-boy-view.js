"use client";
import { useState } from "react";
import JoinRequestRejectionModal from "../modal/reject-modal";
import ActionButtion from "./action-view";
import { ChangeStatus } from "@/services/joinrequest/join";
import { getRole, getValidImageUrl, useAuthToken } from "@/utils/constants";
import Image from "next/image";
import UserInfo from "@/components/user-info";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
export default function DeliveryboyView({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [successmessage, setSuccessmessage] = useState(null);
  const [reason, setReason] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const token=useAuthToken()
  const submitHandler = async (reason) => {
    try {
      const response = await ChangeStatus(
        data.role,
        "REJECTED",
        data.deliveryboyId,
        reason,
        token
      );
      setSuccessmessage("Rejection submitted successfully");
      setError(null); // Clear any existing errors
    } catch (error) {
      setError("Failed to submit rejection. Please try again.");
    }
  };
  return (
    <>
      <div className="flex gap-6">
        <div className="w-1/4 rounded-lg">
          <div
            className="bg-boxdark dark:border-strokedark dark:bg-boxdark p-6 rounded-lg"
            style={{ height: "450px" }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-green-500 w-30 h-30 rounded-full flex items-center justify-center mb-4">
                {data.profile_pic ? (
                  <Image
                    src={getValidImageUrl(data.profile_pic)}
                    alt={`${data.first_name || "User"} ${data.last_name || ""}`}
                    className="w-full h-full rounded-full object-cover"
                    width={80}
                    height={80}
                  />
                ) : (
                  <span className="text-2xl text-white font-bold">
                    {data.first_name
                      ? data.first_name.charAt(0).toUpperCase()
                      : "U"}
                  </span>
                )}
              </div>
              <h2 className="text-lg font-semibold text-white">
                {data.first_name || "Unknown"} {data.last_name || ""}
              </h2>
            </div>
            <div className="mt-4 flex justify-center">
              <p className="font-semibold text-white">
                <span className="text-yellow-400">{getRole(data?.role)}</span>
              </p>
            </div>

            <div className="mt-4 text-white">
              <div className="flex items-center gap-2">
                <span className="text-sm">📧 {data?.email}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">📞 {data?.phone}</span>
              </div>
              <div className="flex items-center  mt-4 gap-2">
                <span className="text-sm">Document View :</span>
                <Link
                  href={`/deliveryboy/document/${data?.deliveryboyId}`}
                  className="text-primary"
                >
                  <FaEye size={25} />
                </Link>
              </div>
              {data?.is_active === 2 && (
                <div className="flex items-center  mt-4 gap-2">
                  <span className="text-sm">Reason :</span>
                  <spen>{data?.dreason}</spen>
                </div>
              )}
            </div>
            <ActionButtion
              onChange={openModal}
              role={data?.role}
              status="ACCEPTED"
              ext_id={data?.deliveryboyId}
              reason={data?.dreason}
              isShow={data?.status || "Pending"}
            />
            <JoinRequestRejectionModal
              showModal={showModal}
              closeModal={closeModal}
              reason={reason}
              setReason={setReason}
              submitHandler={submitHandler}
            />
          </div>
        </div>
        <div className="w-3/4    sm:px-7.5 ">
          <UserInfo data={data} userType="deliveryboy" />
          {error && <p className="text-red-500">{error}</p>}
          {successmessage && <p className="text-green-500">{successmessage}</p>}
        </div>
      </div>
    </>
  );
}
