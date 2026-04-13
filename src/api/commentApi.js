import axiosInstance from "./axiosInstance";

export const getCommentsByPostId = async (postId) => {
    const res = await axiosInstance.get(`/comments/posts/${postId}`);
    console.log("댓글 응답 데이터 : ", res.data);
    return res.data;
};

export const createComment = async (data) => {
    const res = await axiosInstance.post("/comments", data);
    return res.data;
};

export const deleteComment = async (id) => {
    await axiosInstance.delete(`/comments/${id}`);
};