import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";

export default function UserInfo({ data, userType }) {np
  return (
    <div className="dark:border-strokedark dark:bg-boxdark bg-white text-black dark:text-white p-6 rounded-lg mt-6 shadow-md">
      {userType == "deliveryboy" && (
        <>
          <h2 className="text-md font-bold mb-4">Vehicle Information</h2>
          <div className="space-y-2 text-md">
            {data?.vehicles?.length > 0 ? (
              data.vehicles.map((item, key) => (
                <div key={key}>
                  <p>
                    <strong>Vehicle Name:</strong>{" "}
                    <Link
                      target="_blank"
                      className="text-primary"
                      href={`/vehicle/${item.id}`}
                    >
                      {item?.modal}
                    </Link>
                  </p>
                  <p>
                    <strong>Vehicle Number:</strong>{" "}
                    <span className="border-2 px-3 py-1 rounded-lg border-dashed inline-block">
                      {item.plat_no}
                    </span>
                  </p>
                  <p>
                    <strong>Vehicle Type:</strong>{" "}
                    <Link
                      target="_blank"
                      className="text-primary"
                      href={`/vehicletype/${item.vehicle_type_id}`}
                    >
                      {item?.vehicle_type}
                    </Link>
                  </p>
                  <p className="flex items-center gap-2">
                    <strong>Vehicle Docs:</strong>{" "}
                    <Link
                      target="_blank"
                      className="text-white p-2 rounded-md bg-secondary dark:bg-boxdark dark:text-white"
                      href={`/vehicle/document/${item.id}`}
                    >
                      <FaEye size={20} />
                    </Link>
                  </p>
                </div>
              ))
            ) : (
              <>
                <p className="text-center">Data not found.</p>
              </>
            )}
            {/*  <p><strong>Seats:</strong> 8</p> */}
            {/* <p><strong>Vehicle Color:</strong> Orange</p> */}

            {/* <p><strong>Zone:</strong> Worldwide</p> */}
          </div>
          <h2 className="text-md font-bold mt-6 mb-4">Basic Details</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong className="mr-1">Country :</strong>{" "}
              {data?.country || "N/A"}
            </p>
            <p>
              <strong className="mr-1">State :</strong> {data?.state || "N/A"}
            </p>
            <p>
              <strong className="mr-1">City :</strong> {data?.city || "N/A"}
            </p>
            <p>
              <strong className="mr-1">Siret No :</strong>{" "}
              <span className="border-2 px-3 py-1  rounded-lg border-dashed inline-block">
                {data?.siret_no}
              </span>
            </p>
            <p>
              <strong className="mr-1">Work Type :</strong>{" "}
              <Link
                target="_blank"
                className="text-primary"
                href={`/worktype/${data.work_type_id}`}
              >
                {data?.work_type || "N/A"}
              </Link>
            </p>
            <p>
              <strong className="mr-1">Work type description :</strong>{" "}
              {data?.work_type_desc || "N/A"}
            </p>
          </div>

          <h2 className="text-md font-bold mt-6 mb-4">Bank Details</h2>
          <div className="space-y-2 text-sm">
            <p>Data not found.</p>
            {/* <p>
              <strong className="mr-1">Bank Name :</strong> Xbc bank
            </p>
            <p>
              <strong className="mr-1">Bank Branch :</strong> Xbc branch
            </p>
            <p>
              <strong className="mr-1">Holder Name :</strong> AJS
            </p>
            <p>
              <strong className="mr-1">Account No :</strong>{" "}
              <span className="border-2 px-3 py-1  rounded-lg border-dashed inline-block">
                2454FRER
              </span>
            </p>
            <p>
              <strong className="mr-1">Other Info :</strong>{" "}
            </p> */}
          </div>
        </>
      )}

      {userType == "consumer" && (
        <>
          <h2 className="text-md font-bold mt-6 mb-4">Basic Details</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong className="mr-1">First Name :</strong> {data?.first_name || 'N/A'}
            </p>
            <p>
              <strong className="mr-1">last_name :</strong> {data?.last_name || 'N/A'}
            </p>
            <p>
              <strong className="mr-1">Country :</strong> {data?.country}
            </p>
          </div>
        </>
      )}
      {userType == "enterprise" && (
        <>
          <h2 className="text-md font-bold mt-6 mb-4">Basic Details</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong className="mr-1">First Name :</strong> {data?.first_name || 'N/A'}
            </p>
            <p>
              <strong className="mr-1">Last Name :</strong> {data?.last_name || 'N/A'}
            </p>
            <p>
              <strong className="mr-1">Company Name :</strong> {data?.company_name || 'N/A'}
            </p>
            <p>
              <strong className="mr-1">Country :</strong> {data?.country || 'N/A'}
            </p>
            <p>
              <strong className="mr-1">State :</strong> {data?.state || 'N/A'}
            </p>
            <p>
              <strong className="mr-1">City :</strong> {data?.city || 'N/A'}
            </p>
            <p>
              <strong className="mr-1">Siret No :</strong>{" "}
              <span className="border-2 px-3 py-1  rounded-lg border-dashed inline-block">
                {data?.siret_no || 'N/A'}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
