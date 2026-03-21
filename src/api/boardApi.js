import axiosInstance from "./axiosInstance";

export const getBoards = async () => {
    const response = await axiosInstance.get("/boards");
    return response.data;
};

export const getBoardById = async (id) => {
    const response = await axiosInstance.get(`/boards/${id}`);
    return response.data;
};

export const createBoard = async (name, description, token) => {
    const response = await axiosInstance.post(
        "/boards",
        { name, description },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const updateBoard = async (id, name, description, token) => {
    const response = await axiosInstance.put(
        `/boards/${id}`,
        { name, description },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const deleteBoard = async (id, token) => {
    const response = await axiosInstance.delete(`/boards/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};