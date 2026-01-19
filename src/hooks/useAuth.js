import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import axiosClient from "../config/axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const token = localStorage.getItem("AUTH_TOKEN");

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    clienteAxios("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw Error(error?.response?.data?.errors);
      }),
  );

  const login = async (datos, setErrores) => {
    try {
      const { data } = await axiosClient.post("api/login", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]);
      await mutate();
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  };

  return {
    login,
    user,
    error,
  };
};
