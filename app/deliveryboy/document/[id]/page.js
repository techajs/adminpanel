"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LayoutPage from "@/components/Layouts/layout";
import BaseViewTable from "@/components/tables/views/base-table";

const DeliverboyDocs = ({ params }) => {
  const data = [];
  return (
    <LayoutPage>
      <Breadcrumb pageName="Document" title="deliveryboy" />
      <div
        className="rounded-sm border border-stroke  bg-white  px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
        style={{ height: "auto" }}
      >
        <div className="max-w-full overflow-x-autor">
          <div className="flex justify-center max-w-full">
            <div className=" text-white bg-boxdark dark:border-strokedark dark:bg-boxdark border-b rounded-md p-2 mb-3 items-center">
              <button>Kalim's Document Details</button>
            </div>
          </div>

          <BaseViewTable data={data} datatype="document" />
        </div>
      </div>
    </LayoutPage>
  );
};

export default DeliverboyDocs;
