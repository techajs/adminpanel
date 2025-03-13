
"use client"
import { useGlobalData } from "@/app/context/GlobalDataContext";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Waiting from "@/components/common/waiting";
import LayoutPage from "@/components/Layouts/layout";
import VehicleAndTypeView from "@/components/vehicle/view-page";
import { useEffect, useState } from "react";


const ViewVehicle = ({params}) => {
  const {vehicle} = useGlobalData()
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    if (vehicle) {
      const foundVehicle = vehicle.find(
        (v) => String(v.id) === String(params.id)
      );
      if (foundVehicle) {
        setVehicleData(foundVehicle);
      }
      setLoading(false);
    }
  }, [vehicle]);
  return (
    <LayoutPage>
      <Breadcrumb pageName="View Vehicle" title="vehicle" />
      {loading ? <Waiting /> : <VehicleAndTypeView data={[vehicleData]} datatype={`vehicle`} />}
    </LayoutPage>
  );
};

export default ViewVehicle;
