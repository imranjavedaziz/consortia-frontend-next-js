import toast from "react-hot-toast";
import { publicAxios } from "../../api";
import {
  GET_ALL_COUNTRIES,
  GET_STATE_AGAINST_COUNTRY,
} from "../../constants/endpoints";

export const getCountriesList = async () => {
  try {
    const res = await publicAxios.get(`${GET_ALL_COUNTRIES}`, {});
    // console.log("res", res?.data?.data);
    return res?.data?.data;
    // toast.success("Welcome to Consortia! Please verify your email");
    // setEmail(email);
    // setEmailVerificationOpen(true);
  } catch (error) {
    if (Array.isArray(error?.data?.message)) {
      toast.error(error?.data?.message?.error?.[0]);
    } else {
      if (typeof error?.data?.message === "string") {
        toast.error(error?.data?.message);
      } else {
        toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
      }
    }
  }
};

export const getStateAgainstCountry = async (countryName) => {
  try {
    const res = await publicAxios.get(
      `${GET_STATE_AGAINST_COUNTRY}?country=${countryName}`,
      {}
    );
    return res?.data?.data;
    // toast.success("Welcome to Consortia! Please verify your email");
    // setEmail(email);
    // setEmailVerificationOpen(true);
  } catch (error) {
    if (Array.isArray(error?.data?.message)) {
      toast.error(error?.data?.message?.error?.[0]);
    } else {
      if (typeof error?.data?.message === "string") {
        toast.error(error?.data?.message);
      } else {
        toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
      }
    }
  }
};
