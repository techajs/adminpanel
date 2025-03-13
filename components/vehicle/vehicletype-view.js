"use client";
import { formatDate } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineHideImage } from "react-icons/md";
import DocumentModal from "./document-modal";
import Waiting from "../common/waiting";
import { useGlobalData } from "@/app/context/GlobalDataContext";
import { getImageByUrl } from "@/server";

const VehicleTypeView = ({ VehicleTypeId }) => {
  const { vehicleType,fetchAllData } = useGlobalData();
  const [vehicleTypeData, setVehicleTypeData] = useState(vehicleType);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const fetchVehicleData = async () => {
      setLoading(true);
      if (vehicleType) {
        const foundVehicleType = vehicleType.find(
          (v) => String(v.id) === String(VehicleTypeId)
        );

        if (foundVehicleType) {
          let vehicleData = { ...foundVehicleType };
          if (vehicleData.pic) {
            try {
              const imageData = await getImageByUrl(vehicleData?.pic);
              vehicleData = {
                ...vehicleData,
                pic: imageData.url,
                status: imageData.status,
              };
            } catch (error) {
              vehicleData = { ...vehicleData, status: false };
              console.error("Error fetching image:", error);
            }
          }

          setVehicleTypeData(vehicleData);
        }
      }else{
        fetchAllData
      }
      setLoading(false);
    };
   if(VehicleTypeId){
    fetchVehicleData();
   }
  
  }, [VehicleTypeId]);

  const openModal = () => setShowModal(true);
  return (
    <div className="max-w-5xl mx-auto sm:p-6 rounded-lg shadow-lg dark:bg-boxdark">
      {/* Back Button */}

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Vehicle Type Information</h2>
      </div>

      {/* Main Content */}
      {vehicleTypeData == null ? (
        <div className="flex justify-center w-full">
          <div className="h-40 w-40 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500 dark:bg-boxdark border">
            <span>No Data Available</span>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-md dark:bg-boxdark">
            {/* Image Section */}
            <div
              className="md:col-span-1 flex justify-center items-center cursor-pointer"
              onClick={() => openModal()}
            >
              {vehicleTypeData?.status ? (
                <Image
                  src={vehicleTypeData.pic}
                  alt="Vehicle"
                  width={40}
                  height={40}
                  className="h-48 w-48 object-cover rounded-lg shadow-lg"
                />
              ) : (
                <div className="h-40 w-40 flex flex-col items-center justify-evenly bg-gray-200 rounded-lg text-gray-500 dark:bg-boxdark border">
                  <MdOutlineHideImage size={40} />
                  <span>No Image Available</span>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <strong>Vehicle Type:</strong>{" "}
                {vehicleTypeData?.vehicle_type || "N/A"}
              </p>
              <p>
                <strong>Vehicle Type Desc:</strong>{" "}
                {vehicleTypeData?.vehicle_type_desc || "N/A"}
              </p>
              <p>
                <strong>Base Price:</strong>{" "}
                {vehicleTypeData?.base_price?.toFixed(2) || "N/A"}
              </p>
              <p>
                <strong>KM Price:</strong>{" "}
                {vehicleTypeData?.km_price?.toFixed(2) || "N/A"}
              </p>
              <p>
                <strong>Percent:</strong>{" "}
                {vehicleTypeData?.percent?.toFixed(2) || "N/A"}
              </p>
              <p>
                <strong>Percent Calc:</strong>{" "}
                {vehicleTypeData?.percent_calc?.toFixed(2) || "N/A"}
              </p>
              <p>
                <strong>Length:</strong> {vehicleTypeData?.length || "N/A"}
              </p>
              <p>
                <strong>Height:</strong> {vehicleTypeData?.height || "N/A"}
              </p>
              <p>
                <strong>Width:</strong> {vehicleTypeData?.width || "N/A"}
              </p>
              <p>
                <strong>Is Base Price:</strong>{" "}
                {vehicleTypeData?.is_base_price || "N/A"}
              </p>
              <p>
                <strong>Commission Percentage:</strong>{" "}
                {vehicleTypeData?.commission_percentage || "N/A"}
              </p>
              <p>
                <strong>Enterprise Commission Percentage:</strong>{" "}
                {vehicleTypeData?.enterprise_commission_percentage?.toFixed(
                  2
                ) || "N/A"}
              </p>
              <p>
                <strong>Waiting Fare:</strong>{" "}
                {vehicleTypeData?.waiting_fare?.toFixed(2) || "N/A"}
              </p>
              <p>
                <strong>Enterprise Waiting Fare:</strong>{" "}
                {vehicleTypeData?.enterprise_waiting_fare?.toFixed(2) || "N/A"}
              </p>
              <p>
                <strong>Created On:</strong>{" "}
                {formatDate(vehicleTypeData?.created_on) || "N/A"}
              </p>
            </div>
          </div>
          <div className="mb-6 mt-6 flex items-center justify-center">
            <Link
              href={`/vehicletype/${vehicleTypeData?.id}/edit`}
              className="text-primary"
            >
              <FaRegEdit size={30} /> Edit
            </Link>
          </div>
        </>
      )}

      <DocumentModal
        showModal={showModal}
        closeModal={closeModal}
        url={vehicleTypeData?.pic}
        docName={vehicleTypeData?.vehicle_type}
        docStatus={vehicleTypeData?.status}
      />
    </div>
  );
};

export default VehicleTypeView;
