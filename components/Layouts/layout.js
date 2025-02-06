"use client";

import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../Header";
import Loader from "../common/loader";
import { NotificationProvider } from "@/app/context/NotificationContext";
import  useFirebaseMessaging  from "@/hooks/useFirebaseMessaging";


export default function LayoutPage({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useFirebaseMessaging()
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
      <NotificationProvider>
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <Loader>
            <main>
              
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
             
            </main>
          </Loader>

          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </NotificationProvider>

      </div>

      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
