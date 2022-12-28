import axios from "axios";

export const publicAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

publicAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error?.response);
  }
);

const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    return token;
  }
};
export const privateAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
