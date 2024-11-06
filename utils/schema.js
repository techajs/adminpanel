import * as Yup from "yup";
export const vehicleValicationSchema = Yup.object({
    extdelivery_boy_ext_id:Yup.string(),
    vehicle_type:Yup.string().required('Vehicle type is required.'),
    modal: Yup.string().min(4, "Model must be at least 4 characters").required("Model is required"),
    make: Yup.string().min(4, "Make must be at least 4 characters").required("Make is required"),
    variant: Yup.string().required("Variant is required"),
    reg_doc: Yup.mixed(),
    driving_license: Yup.mixed(),
    insurance: Yup.mixed(),
    passport: Yup.mixed(),
    plat_no: Yup.string().min(6, "Plan number must be at least 6 characters").required("Plat number is required"),
})

export const vehicleTypeValidationSchema = Yup.object({
  vehicle_type: Yup.string().required("Vehicle type is required."),
  vehicle_type_desc: Yup.string()
    .min(4, "Description must be at least 4 characters")
    .required("Description is required"),
  base_price: Yup.number()
    .typeError("Base price must be a valid number")
    .test(
      "is-positive-or-zero",
      "Base price must be a positive number or 0.00",
      (value) => value >= 0
    )
    .test(
      "is-decimal",
      "Base price must have at most two decimal places",
      (value) =>
        value === 0 ||
        (value !== undefined &&
          value !== null &&
          /^(\d+(\.\d{1,2})?)$/.test(value.toString()))
    )
    .required("Base price is required"),
  km_price: Yup.number()
    .typeError("Km price must be a valid number")
    .test(
      "is-positive-or-zero",
      "Km price must be a positive number or 0.00",
      (value) => value >= 0
    )
    .test(
      "is-decimal",
      "Km price must have at most two decimal places",
      (value) =>
        value === 0 ||
        (value !== undefined &&
          value !== null &&
          /^(\d+(\.\d{1,2})?)$/.test(value.toString()))
    )
    .required("Km price is required"),
  percent: Yup.number()
    .typeError("Percent must be a valid number")
    .test(
      "is-positive-or-zero",
      "Percent must be a positive number or 0.00",
      (value) => value >= 0
    )
    .test(
      "is-decimal",
      "Percent must have at most two decimal places",
      (value) =>
        value === 0 ||
        (value !== undefined &&
          value !== null &&
          /^(\d+(\.\d{1,2})?)$/.test(value.toString()))
    ),
  percent_calc: Yup.number()
    .typeError("Percent calculation must be a valid number")
    .test(
      "is-positive-or-zero",
      "Percent calculation must be a positive number or 0.00",
      (value) => value >= 0
    )
    .test(
      "is-decimal",
      "Percent calculation must have at most two decimal places",
      (value) =>
        value === 0 ||
        (value !== undefined &&
          value !== null &&
          /^(\d+(\.\d{1,2})?)$/.test(value.toString()))
    ),
  length: Yup.string(),
  height: Yup.mixed(),
  width: Yup.string(),
  is_base_price: Yup.number()
    .typeError("Is base price must be 0 or 1")
    .oneOf([0, 1], "Is base price must be either 0 or 1")
    .required("Is base price is required"),
  commission_percentage: Yup.number()
    .typeError("Commission percentage must be a valid number")
    .test(
      "is-positive-or-zero",
      "Commission percentage must be a positive number or 0.00",
      (value) => value >= 0
    )
    .test(
      "is-decimal",
      "Commission percentage must have at most two decimal places",
      (value) =>
        value === 0 ||
        (value !== undefined &&
          value !== null &&
          /^(\d+(\.\d{1,2})?)$/.test(value.toString()))
    )
    .required("commission percentage is required"),
  enterprise_commission_percentage: Yup.number()
    .typeError("Enterprise commission percentage must be a valid number")
    .test(
      "is-positive-or-zero",
      "Enterprise commission percentage must be a positive number or 0.00",
      (value) => value >= 0
    )
    .test(
      "is-decimal",
      "Enterprise commission percentage must have at most two decimal places",
      (value) =>
        value === 0 ||
        (value !== undefined &&
          value !== null &&
          /^(\d+(\.\d{1,2})?)$/.test(value.toString()))
    )
    .required("Enterprise commission percentage is required"),
  waiting_fare: Yup.number()
    .typeError("Waiting fare must be a valid number")
    .test(
      "is-positive-or-zero",
      "Waiting fare must be a positive number or 0.00",
      (value) => value >= 0
    )
    .test(
      "is-decimal",
      "Waiting fare must have at most two decimal places",
      (value) =>
        value === 0 ||
        (value !== undefined &&
          value !== null &&
          /^(\d+(\.\d{1,2})?)$/.test(value.toString()))
    ),
  enterprise_waiting_fare: Yup.number()
    .typeError("Enterprise waiting fare must be a valid number")
    .test(
      "is-positive-or-zero",
      "Enterprise waiting fare must be a positive number or 0.00",
      (value) => value >= 0
    )
    .test(
      "is-decimal",
      "Enterprise waiting fare must have at most two decimal places",
      (value) =>
        value === 0 ||
        (value !== undefined &&
          value !== null &&
          /^(\d+(\.\d{1,2})?)$/.test(value.toString()))
    ),
    pic: Yup.mixed(),
});


export const consumerValidationSchema =  Yup.object({
    name: Yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  email: Yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: Yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: Yup
    .string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  phoneNumber: Yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number should contain only digits")
    .min(8, "Phone number must be at least 8 digits"),
  country: Yup
    .object({
      value: Yup.string().required("Country is required"),
    })
    .required("Country is required"),
});
