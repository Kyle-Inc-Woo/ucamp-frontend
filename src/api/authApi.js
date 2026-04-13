import axiosInstance from "./axiosInstance.js";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email, password) => {
    const response = await axiosInstance.post("/auth/login", {
        email,
        password,
    });

    return response.data;
};

export const signup = async ({ email, password, nickname }) => {
    const response = await axiosInstance.post("/auth/signup", {
        email,
        password,
        nickname,
    });

    return response.data;
};

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        { refreshToken },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};