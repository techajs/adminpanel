"use client";
import { useGlobalData } from "@/app/context/GlobalDataContext";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LayoutPage from "@/components/Layouts/layout";
import { GetConsumerById, updateConsumer } from "@/server/consumer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import "react-phone-input-2/lib/style.css";
import { consumerSchema } from "@/utils/schema";
import { useFormik } from "formik";
import Waiting from "@/components/common/waiting";
import { GetCountry } from "@/server";

const EditEnterprise = ({ params }) => {
  const { country,fetchAllData } = useGlobalData();
  const router = useRouter();
  const [deliveryboy, setDeliveryboy] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchEnterpriseData = async (id) => {
    try {
      const res = await GetConsumerById(id);
      setDeliveryboy(res?._response[0] || {});
    } catch (error) {
      setDeliveryboy({});
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchEnterpriseData(params?.id);
    }
  }, []);

  useEffect(() => {
    const getCountry = async () =>{
      const res = await GetCountry()
      if(res?._success){
        const country = res?._response
        setCountryData(
          country?.map((item) => ({ label: item.country_name, value: item.id }))
        );
      }
    }
    if (country) {
      setCountryData(
        country?.map((item) => ({ label: item.country_name, value: item.id }))
      );
    } else {
      getCountry()
    }
  }, [country]);

  const formik = useFormik({
    initialValues: {
      name: deliveryboy?.first_name || "",
      email: deliveryboy?.email || "",
      phoneNumber: deliveryboy?.phone || "",
      country:
        countryData.find((c) => c.label === deliveryboy?.country) || null,
    },
    enableReinitialize: true,
    validationSchema: consumerSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        ext_id: params.id,
        first_name: values.name,
        phone: values.phoneNumber.replace(/\D/g, ""),
        country_id: values.country.value,
      };

      try {
        const res = await updateConsumer(payload);
        setStatusMessage({ text: res?._response?.message, type: "success" });
      } catch (error) {
        setStatusMessage({
          text: "Error updating deliveryboy.",
          type: "error",
        });
      } finally {
        setLoading(false);
        setTimeout(() => {
          setStatusMessage("")
          router.back()
        }, 2500);
      }
    },
  });
  return (
    <LayoutPage>
      <Breadcrumb pageName={`Edit consumer`} title={`consumer`} />
      <div className="p-10 bg-white shadow-lg rounded-lg dark:border-strokedark dark:bg-boxdark relative mt-5">
        <div class="bg-black text-white p-2 px-4 rounded-md absolute -top-5">
          Consumer Details
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="Enter first name..."
                className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">{formik.errors.name}</div>
              ) : null}
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                readOnly={true}
                placeholder="Enter last name..."
                className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Phone Number
              </label>
              <PhoneInput
                country="fr"
                value={formik.values.phoneNumber}
                onChange={(value) =>
                  formik.setFieldValue("phoneNumber", value.replace(/\D/g, ""))
                }
                onBlur={() => formik.setFieldTouched("phoneNumber", true)}
                className="border rounded-md"
                inputStyle={{ width: "100%" }}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-500">{formik.errors.phoneNumber}</div>
              ) : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Country
              </label>
              <Select
                options={countryData}
                value={formik.values.country}
                onChange={(option) => formik.setFieldValue("country", option)}
                onBlur={() => formik.setFieldTouched("country", true)}
                placeholder="select a country"
                className="border rounded-md"
              />
              
              {formik.touched.country && formik.errors.country ? (
                <div className="text-red-500">
                  {formik.errors.country}
                </div>
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
        </form>
      </div>
    </LayoutPage>
  );
};

export default EditEnterprise;
