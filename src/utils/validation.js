import * as Yup from "yup"

export const SignupCustomerSchema = Yup.object().shape({
  address_1: Yup.string().max(100, "Too Long!"),
  address_2: Yup.string().max(100, "Too Long!"),
  city: Yup.string().max(100, "Too Long!"),
  country: Yup.string().max(100, "Too Long!"),
  day_phone: Yup.string().max(100, "Too Long!"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
    .max(100, "Too Long!"),
  eve_phone: Yup.string().max(100, "Too Long!"),
  mob_phone: Yup.string().max(100, "Too Long!"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  password: Yup.string()
    .max(100, "Too Long!")
    .required("Required"),
  password_confirm: Yup.string()
    .max(100, "Too Long!")
    .oneOf([Yup.ref("password")], "Passwords don't match")
    .required("Required"),
  postal_code: Yup.string().max(100, "Too Long!"),
  region: Yup.string().max(100, "Too Long!"),
  shipping_region_id: Yup.number()
    .integer()
    .required("Required"),
})

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Required"),
})
