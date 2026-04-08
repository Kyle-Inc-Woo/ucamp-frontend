import axiosInstance from "./axiosInstance.js";
import axios from "axios";


export const login = async (email, password) => {
    const response = await axiosInstance.post("/auth/login",{
        email,
        password,
    });

    return response.data;
};

export const signup = async ({email,password, nickname}) => {
    const response = await axiosInstance.post("/auth/signup", {
        email,
        password,
        nickname,
    });
    return response.data
};

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await axios.post("http://localhost:8080/auth/refresh", {
        refreshToken,
    });

    return response.data;
};