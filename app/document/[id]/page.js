"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Waiting from "@/components/common/waiting";
import LayoutPage from "@/components/Layouts/layout";
import DocumentBaseTable from "@/components/vehicle/document-table-view";
import {GetVl } from "@/server";
import { formatDate } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

const DeliverboyDocs = ({ params }) => {
  const extId = params?.id || null;
  const [vehicleData, setVehicleData] = useState(null);
  const [documents,setDocuments]=useState([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getVehicle = async () => {
      const res = await GetVl();
      if (res?._success) {
        const vl = res?._response;
        const foundVehicle = vl?.filter((item) => item.ext_id === extId);
        if (foundVehicle) {
          setLoading(false);
          setVehicleData(foundVehicle[0]);
          const documents = [
            {
              id: 1,
              name: "Vehicle Registration",
              imageUrl: foundVehicle[0]?.reg_doc,
              status: true,
            },
            {
              id: 2,
              name: "Driver License",
              imageUrl: foundVehicle[0]?.driving_license,
              status: true,
            },
            {
              id: 3,
              name: "Passport",
              imageUrl: foundVehicle[0]?.passport,
              status: true,
            },
            {
              id: 4,
              name: "Vehicle Insurance",
              imageUrl: foundVehicle[0]?.insurance,
              status: true,
            },
          ];
          setDocuments(documents)
        }
      }
    };
    if (extId) {
      getVehicle();
    }
  }, [extId]);
  
  return (
    <LayoutPage>
      <Breadcrumb pageName="View Vehicle" title="vehicle" />
      {loading ? (
        <Waiting />
      ) : ( <div className="flex flex-col sm:flex-row gap-6">
        <>
          <div className="sm:w-1/4 rounded-lg">
            <div className="dark:border-strokedark dark:bg-boxdark bg-white text-black dark:text-white p-6 rounded-lg mt-6 shadow-md">
              <h2 className="text-md font-bold mb-4">Vehicle Information</h2>
              <div className="space-y-2 text-md">
                {vehicleData ? (
                  <div >
                  <p>
                    <strong>Vehicle Name:</strong> {vehicleData?.modal || "N/A"}
                  </p>
                  <p>
                    <strong>Vehicle Number:</strong>{" "}
                    <span className="border-2 px-3 py-1 rounded-lg border-dashed inline-block">
                      {vehicleData?.plat_no || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong>Vehicle Type:</strong>{" "}
                    <Link
                      className="text-primary"
                      href={`/vehicletype/${vehicleData?.vehicle_type_id}`}
                    >
                      {vehicleData?.vehicle_type || "N/A"}
                    </Link>
                  </p>
                  <p>
                    <strong>Make:</strong> {vehicleData?.make || "N/A"}
                  </p>
                  <p>
                    <strong>Variant :</strong> {vehicleData?.variant || "N/A"}
                  </p>
                  <p>
                    <strong>Created On :</strong>{" "}
                    {formatDate(vehicleData?.created_on) || "N/A"}
                  </p>
                  <p className="flex vehicleDatas-center gap-2">
                    <strong>Delivery Boy Name:</strong>{" "}
                    <Link
                      className="text-primary"
                      href={`/deliveryboy/${vehicleData?.ext_id}`}
                    >
                      {vehicleData?.delivery_boy_name || "N/A"}
                    </Link>
                  </p>
                </div>
                ) : (
                  <>
                    <p className="text-center">Data not found.</p>
                  </>
                )}
                {/*  <p><strong>Seats:</strong> 8</p> */}
                {/* <p><strong>Vehicle Color:</strong> Orange</p> */}

                {/* <p><strong>Zone:</strong> Worldwide</p> */}
              </div>
            </div>
          </div>
          <div
            className={`sm:w-3/4 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}
          >
            <DocumentBaseTable data={documents} />
          </div>
        </>
      </div>) }
    </LayoutPage>
  );
};

export default DeliverboyDocs;
