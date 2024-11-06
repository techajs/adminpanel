"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LayoutPage from "@/components/Layouts/layout";
import { useState } from "react";

const ViewVehicle = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <LayoutPage>
      <Breadcrumb pageName="Edit Vehicle" title="vehicle" />
      <div x-data="{ switcherToggle: false }">
        <label
          htmlFor="toggle2"
          className="flex cursor-pointer select-none items-center"
        >
          <div className="relative">
            <input
              id="toggle2"
              type="checkbox"
              className="sr-only"
              onChange={() => {
                setEnabled(!enabled);
              }}
            />
            <div className={`h-6 w-12 rounded-full ${enabled ? 'bg-success' :'bg-red'} shadow-inner`}></div>
            <div
              className={`dot absolute -top-0 left-0 h-6 w-6 rounded-full bg-white shadow-switch-1 transition ${
                enabled &&
                "!right-0 !translate-x-full !bg-white dark:!bg-white"
              }`}
            ></div>
          </div>
        </label>
      </div>
    </LayoutPage>
  );
};

export default ViewVehicle;
