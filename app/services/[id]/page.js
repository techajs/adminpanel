"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Waiting from "@/components/common/waiting";
import LayoutPage from "@/components/Layouts/layout";
import { GetServiceTypeById, updateServiceType } from "@/server/servicetype";
import { serviceSchema } from "@/utils/schema";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const EditServiceType = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [serviceType, setServiceType] = useState(null);
  const [serviceTypeId, setServiceTypeId] = useState(params.id || null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchServiceType = async (sid) => {
      try {
        const response = await GetServiceTypeById(sid);
        setServiceType(response[0]);
      } catch (error) {
        setServiceType(null); // Handle error by setting joinview to null
      }
    };
    if (serviceTypeId) {
      console.log(serviceTypeId);
      fetchServiceType(serviceTypeId);
    }
  }, [serviceTypeId]);
  const formik = useFormik({
    initialValues: {
      serviceType: serviceType?.service_name || "",
      discount: serviceType?.discount || 0,
      isDel: serviceType?.is_del == 0 ? true : false,
    },
    enableReinitialize: true,
    validationSchema: serviceSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const isDelete = values.isDel ? 0 : 1;
      const payload = {
        extId: params.id,
        service_name: values.serviceType,
        discount: values.discount,
        is_del: values.isDel ? 0 : 1,
        isDelValue: serviceType.is_del == isDelete ? false : true,
      };
      try {
        const res = await updateServiceType(payload);
        if(res?._success){
          const response=res?._response
          setStatusMessage({ text: response, type: "success" });
        }else{
          setStatusMessage({
            text: "Error updating service type.",
            type: "error",
          });
        }
        
      } catch (error) {
        setStatusMessage({
          text: "Error updating service type.",
          type: "error",
        });
        console.log("error ",error)
      } finally {
        setLoading(false);
        setTimeout(() => setStatusMessage(""), 2500);
      }
    },
  });

  return (
    <LayoutPage>
      <Breadcrumb pageName={`Edit Sevice type`} title={`edit service`} />
      <div className="p-10 bg-white shadow-lg rounded-lg dark:border-strokedark dark:bg-boxdark relative mt-5">
        <div class="bg-black text-white p-2 px-4 rounded-md absolute -top-5">
          Service Type Details
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Service Name
              </label>
              <input
                type="text"
                name="serviceType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.serviceType}
                placeholder="Enter service name..."
                className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {formik.touched.serviceType && formik.errors.serviceType ? (
                <div className="text-red-500">{formik.errors.serviceType}</div>
              ) : null}
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Discount
              </label>
              <input
                type="text"
                name="discount"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.discount}
                placeholder="Enter discount..."
                className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {formik.touched.discount && formik.errors.discount ? (
                <div className="text-red-500">{formik.errors.discount}</div>
              ) : null}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isDel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.isDel}
                className="mr-2"
              />
              <label className="font-semibold">Active/InActive</label>
              {formik.touched.isDel && formik.errors.isDel ? (
                <div className="text-red-500">{formik.errors.isDel}</div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center mt-10 space-x-5">
            {loading ? (
              <Waiting />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Update
              </button>
            )}
          </div>
        </form>
        {/* Success/Error Messages */}
        {statusMessage && (
          <div
            className={
              statusMessage.type === "success"
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {statusMessage.text}
          </div>
        )}
      </div>
    </LayoutPage>
  );
};

export default EditServiceType;
