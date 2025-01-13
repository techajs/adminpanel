"use client";
import { useEffect, useState } from "react";
import { DashboardService } from "@/services/dashboard/services";
import CardDataStats from "../CardDataStats";
import Link from "next/link";
import { FaClipboardCheck, FaFileExcel, FaTruck, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Dashboarbox from "./box";
import useFetchGlobalData from "@/hooks/useFetchData";
import Waiting from "../common/waiting";

const DashboardLayout = () => {
  const { country, state, city } = useFetchGlobalData();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await DashboardService();
      setDashboardData(response.data);
    };

    fetchData();
  }, []);

  if (!dashboardData) return <Waiting />; // Handle loading state

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Link href="/consumer">
          <CardDataStats
            title="Total Consumer"
            total={dashboardData[0]?.totalConsumers || 0}
          >
            <FaUser />
          </CardDataStats>
        </Link>
        <Link href="/deliveryboy">
          <CardDataStats
            title="Total Delivery boy"
            total={dashboardData[0]?.totalDeliveryBoys || 0}
          >
            <FaUser />
          </CardDataStats>
        </Link>
        <Link href="/enterprise">
          <CardDataStats
            title="Total Enterprise"
            total={dashboardData[0]?.totalEnterprises || 0}
          >
            <FaCartShopping />
          </CardDataStats>
        </Link>
        <Link href="/order">
          <CardDataStats
            title="Total Order"
            total={dashboardData[0]?.totalOrders || 0}
          >
            <FaTruck />
          </CardDataStats>
        </Link>
        <Link href="/order?status=past">
          <CardDataStats
            title="Completed Order"
            total={dashboardData[0]?.completedOrders || 0}
          >
            <FaClipboardCheck />
          </CardDataStats>
        </Link>
        <Link href="/order?status=cancelled">
          <CardDataStats
            title="Cancelled Order"
            total={dashboardData[0]?.canceledOrders || 0}
          >
            <FaFileExcel />
          </CardDataStats>
        </Link>
      </div>

      {/* New Request Card starts here */}
      <div className="grid grid-cols-1 gap-4 mt-[29px] md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <Dashboarbox
          url="/joinrequest"
          icon="request"
          title={`${dashboardData[0]?.requestuserleft} new requests`}
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
