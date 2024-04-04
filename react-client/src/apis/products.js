import axiosClient from "./axios-client";

export const getProducts = (params) => {
  return axiosClient({
    url: "/products",
    method: "get",
    params,
  });
};
