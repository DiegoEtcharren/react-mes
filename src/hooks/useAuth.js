import useSWR from "swr";
import axiosClient from "../config/axios";

export const useAuth = () => {
  const { data: user, error, mutate } = useSWR("/api/user", () =>
      axiosClient.get("/api/user")
        .then((res) => res.data)
        .catch((err) => {
          if (err.response?.status !== 409) throw err;
        })
    );

  const login = async (data, setErrores) => {
      try {
        await axiosClient.get('/sanctum/csrf-cookie');
        await axiosClient.post("api/login", data);
        setErrores([]);
        await mutate();
      } catch (error) {
        console.log(error);
        const mensajes = error.response?.data?.errors
          ? Object.values(error.response.data.errors)
          : ['Credenciales incorrectas'];
        setErrores(mensajes);
      }
    };

  return {
    login,
    user,
    error,
    isLoading: !user && !error,
  };
};
