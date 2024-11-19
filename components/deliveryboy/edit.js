"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import useFetchGlobalData from "@/hooks/useFetchData";
import { useEffect, useState } from "react";
import { GetDeliveryboyById, updateDeliveryboy } from "@/services/deliveryboy";
import { delvieryboySchema } from "@/utils/schema";
import Waiting from "../common/waiting";
import { useRouter } from "next/navigation";
const EditDeliveryboyPage = ({ deliveryboyId }) => {

  const { country, fetchCountry, city, state, fetchCity, fetchState } =useFetchGlobalData();
  const router = useRouter();
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [deliveryboy, setDeliveryboy] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const fetchDeliveryboyView = async (deliveryboyId) => {
    try {
      const response = await GetDeliveryboyById(deliveryboyId);
      setDeliveryboy(response);
    } catch (error) {
      setDeliveryboy([]);
    }
  };
  useEffect(() => {
    if (country) {
      const countries = country.map((country) => ({
        label: country.country_name,
        value: country.id,
      }));
      setCountryData(countries);
    } else {
      fetchCountry();
    }

    if (deliveryboyId) {
      fetchDeliveryboyView(deliveryboyId);
    }
  }, [deliveryboyId, fetchCountry]);

  useEffect(() => {
    if (state) {
      const states = state.map((state) => ({
        label: state.state_name,
        value: state.id,
      }));
      setStateList(states);
    } else {
      fetchState();
    }
  }, [fetchState]);
  useEffect(() => {
    if (city) {
      const cities = city.map((city) => ({
        label: city.city_name,
        value: city.id,
      }));
    
      setCityList(cities);
    } else {
      fetchCity();
    }
  }, [fetchCity]);

  const formik = useFormik({
    initialValues: {
      name: deliveryboy?.first_name || "",
      lastname: deliveryboy?.last_name || "",
      email: deliveryboy?.email || "",
      password: "",
      confirmPassword: "",
      phoneNumber: deliveryboy?.phone || "",
      country:
        countryData?.find(
          (country) => country.value === deliveryboy?.country_id
        ) || null,
      city:
        cityList?.find((city) => city.value === deliveryboy?.city_id) || null,
      state:
        stateList?.find((state) => state.value === deliveryboy?.state_id) ||
        null,
      siret: deliveryboy?.siret_no || "",
      terms: parseInt(deliveryboy?.term_cond1) || 0,
    },
    enableReinitialize: true,
    validationSchema: delvieryboySchema,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        ext_id: deliveryboyId,
        first_name: values.name,
        last_name: values.lastname,
        phone: values.phoneNumber.replace(/\D/g, ""),
        country_id: values.country.value,
        state_id: values.state.value,
        city_id: values.city.value,
        term_condone: values.terms,
        siret_no: values.siret,
      };
      try {
        const response = await updateDeliveryboy(payload);
        setSuccessMessage(response);
      } catch (err) {
        setError("An error occurred while updating deliveryboy.");
      } finally {
        setLoading(false);
        setTimeout(() => {
          setError("");
          setSuccessMessage("");
          // router.replace("/deliveryboy");
        }, 2500);
      }
    },
  });

  return (
    <div className="p-10 bg-white shadow-lg rounded-lg dark:border-strokedark dark:bg-boxdark relative mt-5">
      <div class="bg-black text-white p-2 px-4 rounded-md absolute -top-5">
        Driver Details
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
              onChange={(value) => formik.setFieldValue("phoneNumber", value.replace(/\D/g, ""))}
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
        <div className="flex justify-center space-x-5 col-span-full">
          {successMessage && (
            <p className="text-success text-lg">{successMessage}</p>
          )}
          {error && <p className="text-danger text-lg">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default EditDeliveryboyPage;
