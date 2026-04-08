import axiosInstance from "./axiosInstance";

export const getPosts = async () => {
    const res = await axiosInstance.get("/posts");
    return res.data;
};

export const getPost = async (id) => {
    const res = await axiosInstance.get(`/posts/${id}`);
    return res.data;
};

export const getPostsByBoardId = async (boardId) => {
    const res = await axiosInstance.get(`/boards/${boardId}/posts`);
    return res.data
};

export const createPost = async (data) => {
    const res = await axiosInstance.post("/posts", data);
    return res.data;
};

export const deletePost = async (id) => {
    await axiosInstance.delete(`/posts/${id}`);
};


