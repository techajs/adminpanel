"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DeliveryboyInfo from "@/components/deliveryboy/info";
import LayoutPage from "@/components/Layouts/layout";
import { GetDeliveryboyById } from "@/services/deliveryboy";
import { useAuthToken } from "@/utils/constants";
import { useEffect, useState } from "react";

const DeliveryboyView = ({ params }) => {
  const [deliveryboy, setDeliveryboy] = useState(null);
  const token = useAuthToken()
  const fetchDeliveryboyView = async (ext_id) => {
    try {
      const response = await GetDeliveryboyById(ext_id,token);
      setDeliveryboy(response);
    } catch (error) {
      setDeliveryboy([]); // Handle error by setting to empty array
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchDeliveryboyView(params.id);
    }
  }, [params?.id]);

  return (
    <LayoutPage>
      <Breadcrumb pageName="Delivery Boy Info" title="deliveryboy" />
      <DeliveryboyInfo data={deliveryboy} />
    </LayoutPage>
  );
};

export default DeliveryboyView;
