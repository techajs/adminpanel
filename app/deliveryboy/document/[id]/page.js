"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Waiting from "@/components/common/waiting";
import LayoutPage from "@/components/Layouts/layout";
import VehicleAndTypeView from "@/components/vehicle/view-page";
import useFetchGlobalData from "@/hooks/useFetchData";
import { useEffect, useState } from "react";

const DeliverboyDocs = ({ params }) => {
  const {vehicle,fetchVehicle} = useFetchGlobalData()
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    if (vehicle) {
      const foundVehicle = vehicle.find(
        (v) => String(v.ext_id) === String(params.id)
      );
      if (foundVehicle) {
        setLoading(false)
        setVehicleData(foundVehicle);
      }
      setLoading(false);
    }else{
      fetchVehicle()
    }
  }, [params.id]);
  return (
    <LayoutPage>
      <Breadcrumb pageName="View Vehicle" title="vehicle" />
      {loading ? <Waiting /> : <VehicleAndTypeView data={[vehicleData]} datatype={`vehicle`} />}
    </LayoutPage>
  );
};

export default DeliverboyDocs;
