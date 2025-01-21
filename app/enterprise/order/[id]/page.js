"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import MultipleOrder from "@/components/enterprise/views/multiple-order";
import OnetimeOrder from "@/components/enterprise/views/one-time-order";
import ShiftOrder from "@/components/enterprise/views/shift-order";
import LayoutPage from "@/components/Layouts/layout";
import { GetOrderByNumber } from "@/services/enterprise";
import { useAuthToken } from "@/utils/constants";
import { useEffect, useState } from "react";

const EorderView = ({ params }) => {
    const [order, setOrder] = useState(null);
    const [deliveryboy, setDeliveryboy] = useState(null);
    const [orderLine, setOrderLine] = useState(null);
    const [vehicle, setVehicle] = useState(null);
    const [slotList, setSlotList] = useState(null);
    const token = useAuthToken()
    const fetchEnterpriseOrder = async (ext_id) => {
        try {
            const response = await GetOrderByNumber(ext_id,token);

            if (response) {
                const { order, deliveryBoy, orderLines, vehicle,slots } = response;
                if (deliveryBoy) {
                    order.delivery_boy_name = `${deliveryBoy.first_name} ${deliveryBoy.last_name}`;
                    order.delivery_boy_mobile = deliveryBoy.phone;
                    order.delivery_boy_ext = deliveryBoy.ext_id;
                    order.delivery_pic = deliveryBoy.profile_pic;
                }

                setOrder(order || null);
                setSlotList(slots || null)
                setDeliveryboy(deliveryBoy || null);
                setOrderLine(orderLines || null);
                setVehicle(vehicle || null);
            }
        } catch (error) {
            console.error("Failed to fetch enterprise order:", error);
            setOrder(null); // Handle error by setting to null
        }
    };

    useEffect(() => {
        if (params?.id) {
            fetchEnterpriseOrder(params.id);
        }
    }, [params?.id]);
    return (
        <LayoutPage>
            <Breadcrumb pageName="Order Details" title={`enterprise/${order?.consumer_ext}`} />
            {order && order.delivery_type_id === 1 && (
                <OnetimeOrder order={order} deliveryboy={deliveryboy} vehicle={vehicle} orderLine={orderLine} token={token}/>
            )}
            {order && order.delivery_type_id === 2 && (
                <MultipleOrder order={order} deliveryboy={deliveryboy} vehicle={vehicle} orderLine={orderLine} token={token} />
            )}
             {order && order.delivery_type_id === 3 && (
                <ShiftOrder order={order} deliveryboy={deliveryboy} vehicle={vehicle} orderLine={orderLine} slots={slotList} token={token} />
            )}
        </LayoutPage>
    );
};

export default EorderView;
