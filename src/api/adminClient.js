import axios from "axios";

const axiosAdminClient = axios.create({
    baseURL: "https://www.devapihub.com/api",
    timeout: 10000,
});

axiosAdminClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosAdminClient;
