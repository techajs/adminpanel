"use client";
import useFetchGlobalData from "@/hooks/useFetchData";
import { GetDetail, updateEnterprise} from "@/services/enterprise";
import { enterpriseSchema } from "@/utils/schema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import "react-phone-input-2/lib/style.css";
import Waiting from "@/components/common/waiting";

const EditEnterprisePage = ({ enterpriseId }) => {
  const {
    country,
    fetchCountry,
    city,
    state,
    fetchCity,
    fetchState,
  } = useFetchGlobalData();
  
  const router = useRouter();
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [deliveryboy, setDeliveryboy] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchEnterpriseData = async (id) => {
    try {
      const response = await GetDetail(id);
      setDeliveryboy(response[0] || {});
    } catch (error) {
      setDeliveryboy({});
    }
  };

  useEffect(() => {
    if (country) {
      setCountryData(
        country.map((item) => ({ label: item.country_name, value: item.id }))
      );
    } else {
      fetchCountry();
    }

    if (enterpriseId) {
      fetchEnterpriseData(enterpriseId);
    }
  }, [enterpriseId, country, fetchCountry]);

  useEffect(() => {
    if (state) {
      setStateList(
        state.map((item) => ({ label: item.state_name, value: item.id }))
      );
    } else {
      fetchState();
    }
  }, [state, fetchState]);

  useEffect(() => {
    if (city) {
      setCityList(
        city.map((item) => ({ label: item.city_name, value: item.id }))
      );
    } else {
      fetchCity();
    }
  }, [city, fetchCity]);


  const formik = useFormik({
    initialValues: {
      name: deliveryboy?.first_name || "",
      lastname: deliveryboy?.last_name || "",
      email: deliveryboy?.email || "",
      phoneNumber: deliveryboy?.phone || "",
      country: countryData.find((c) => c.value === deliveryboy?.country_id) || null,
      city: cityList.find((c) => c.value === deliveryboy?.city_id) || null,
      state: stateList.find((s) => s.value === deliveryboy?.state_id) || null,
      siret: deliveryboy?.siret_no || "",
      terms: deliveryboy?.term_cond1 || 0,
      termss: deliveryboy?.term_cond2 || 0,
      company: deliveryboy?.company || "",
      industry: industryList.find((ind) => ind.value === deliveryboy?.industry_type_id) || null,
      deliveries: deliveryboy?.deliveryMonthHours?.match(/\d+/)?.[0] || null,
    },
    enableReinitialize: true,
    validationSchema: enterpriseSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        ext_id: enterpriseId,
        first_name: values.name,
        last_name: values.lastname,
        phone: values.phoneNumber,
        country_id: values.country.value,
        state_id: values.state.value,
        city_id: values.city.value,
        term_cond1: values.terms,
        term_cond2: values.termss,
        siret_no: values.siret,
        company_name: values.company,
        deliveryMonthHours: values.deliveries,
        description: values.comments,
      };

      try {
        const response = await updateEnterprise(payload);
        setStatusMessage({ text: response, type: "success" });
      } catch (error) {
        setStatusMessage({ text: "Error updating deliveryboy.", type: "error" });
      } finally {
        setLoading(false);
        setTimeout(() => setStatusMessage(""), 2500);
      }
    },
  });

  return (
    <div className="p-10 bg-white shadow-lg rounded-lg dark:border-strokedark dark:bg-boxdark relative mt-5">
      <div class="bg-black text-white p-2 px-4 rounded-md absolute -top-5">
        Enterprise Details
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Full Name
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
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
              placeholder="Enter last name..."
              className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="text-red-500">{formik.errors.lastname}</div>
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
              onChange={(value) => formik.setFieldValue("phoneNumber", value)}
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
              <div className="text-red-500">{formik.errors.country.value}</div>
            ) : null}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              State
            </label>
            <Select
              options={stateList}
              value={formik.values.state}
              onChange={(option) => formik.setFieldValue("state", option)}
              onBlur={() => formik.setFieldTouched("state", true)}
              className="border rounded-md"
              placeholder="select a state"
            />
            {formik.touched.state && formik.errors.state ? (
              <div className="text-red-500">{formik.errors.state.value}</div>
            ) : null}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              City
            </label>
            <Select
              options={cityList}
              value={formik.values.city}
              onChange={(option) => formik.setFieldValue("city", option)}
              onBlur={() => formik.setFieldTouched("city", true)}
              placeholder="select a city"
              className="border rounded-md"
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-500">{formik.errors.city.value}</div>
            ) : null}
          </div>
          {/* <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Industry
            </label>
            <Select
              options={industryList}
              value={formik.values.industry}
              onChange={(option) => formik.setFieldValue("industy", option)}
              onBlur={() => formik.setFieldTouched("industry", true)}
              placeholder="select a industy"
              className="border rounded-md"
            />
            {formik.touched.industry && formik.errors.industry ? (
              <div className="text-red-500">{formik.errors.industry.value}</div>
            ) : null}
          </div> */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Siret No
            </label>
            <input
              type="text"
              name="siret"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.siret}
              placeholder="Enter last name..."
              className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {formik.touched.siret && formik.errors.siret ? (
              <div className="text-red-500">{formik.errors.siret}</div>
            ) : null}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Company
            </label>
            <input
              type="text"
              name="siret"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.company}
              placeholder="Enter company name..."
              className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {formik.touched.company && formik.errors.company ? (
              <div className="text-red-500">{formik.errors.company}</div>
            ) : null}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Delivery Per Hour
            </label>
            <input
              type="text"
              name="deliveries"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deliveries}
              placeholder="Enter Hour..."
              className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {formik.touched.deliveries && formik.errors.deliveries ? (
              <div className="text-red-500">{formik.errors.deliveries}</div>
            ) : null}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
             Comments
            </label>
            <input
              type="text"
              name="comments"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comments}
              placeholder="Enter comments..."
              className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {formik.touched.comments && formik.errors.comments ? (
              <div className="text-red-500">{formik.errors.comments}</div>
            ) : null}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="terms"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.terms}
              className="mr-2"
            />
            <label className="font-semibold">Accept Terms and Conditions</label>
            {formik.touched.terms && formik.errors.terms ? (
              <div className="text-red-500">{formik.errors.terms}</div>
            ) : null}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="termss"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.termss}
              className="mr-2"
            />
            <label className="font-semibold">Accept Terms and Conditions</label>
            {formik.touched.termss && formik.errors.termss ? (
              <div className="text-red-500">{formik.errors.termss}</div>
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
          <div className={statusMessage.type === "success" ? "text-green-500" : "text-red-500"}>
            {statusMessage.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default EditEnterprisePage