import { DashboardService } from "@/services/dashboard/services";
import CardDataStats from "../CardDataStats";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Dashboarbox from "./box";

import Link from "next/link";
import { FaClipboardCheck, FaFileExcel, FaTruck, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const DashboardLayout = async () => {
  const { data } = await DashboardService();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Consumer" total={data[0]?.totalConsumers || 0}>
          <Link href="/consumer">
            <FaUser />
          </Link>
        </CardDataStats>
        <CardDataStats
          title="Total Delivery boy"
          total={data[0]?.totalDeliveryBoys || 0}
        >
          <Link href="/deliveryboy">
            <FaUser />
          </Link>
        </CardDataStats>
        <CardDataStats
          title="Total Enterprise"
          total={data[0]?.totalEnterprises || 0}
        >
          <Link href="/enterprise">
            <FaCartShopping />
          </Link>
        </CardDataStats>
        <CardDataStats title="Total Order" total={data[0]?.totalOrders || 0}>
          <Link href="/order">
            <FaTruck />
          </Link>
        </CardDataStats>
        <CardDataStats title="Completed Order" total={data[0]?.completedOrders || 0}>
          <Link href="/order?status=past">
            <FaClipboardCheck />
          </Link>
        </CardDataStats>
        <CardDataStats title="Cancelled Order" total={data[0]?.canceledOrders || 0}>
          <Link href="/order?status=cancelled">
            <FaFileExcel />
          </Link>
        </CardDataStats>
      </div>

      {/* New Request Card starts here */}
      <div className="grid grid-cols-1 gap-4 mt-[29px] md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <Dashboarbox
          url="/joinrequest"
          icon="request"
          title={`${data[0]?.requestuserleft} new requests`}
          subtitle=""
        />
        <Dashboarbox
          url="/join"
          icon="battery"
          title="Manage delivery orders"
        />
        <Dashboarbox icon="advertising" title="Manage Ads" />
        <Dashboarbox
          url="/join"
          icon="credit-card"
          title="Manage Payments & Transactions"
        />
        <Dashboarbox url="/join" icon="schedule" title="Manage Schedules" />
      </div>
    </>
  );
};

export default DashboardLayout;
