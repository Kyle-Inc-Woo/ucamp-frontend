import axiosInstance from "./axiosInstance";

export const getBoards = async () => {
    const response = await axiosInstance.get("/boards");
    return response.data;
};

export const getBoardById = async (id) => {
    const response = await axiosInstance.get(`/boards/${id}`);
    return response.data;
};

export const createBoard = async (name, description) => {
    const response = await axiosInstance.post("/boards", {
        name,
        description,
    });

    return response.data;
};

export const updateBoard = async (id, name, description) => {
    const response = await axiosInstance.put(`/boards/${id}`, {
        name,
        description,
    });

    return response.data;
};

export const deleteBoard = async (id) => {
    const response = await axiosInstance.delete(`/boards/${id}`);
    return response.data;
};