import { useEffect, useState } from "react";
import { getPost, deletePost } from "../api/postApi";
import {
    getCommentsByPostId,
    createComment,
    deleteComment,
} from "../api/commentApi";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function PostDetailPage({ onLogout }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [submittingComment, setSubmittingComment] = useState(false);
    const [deletingCommentId, setDeletingCommentId] = useState(null);

    const isLoggedIn = !!localStorage.getItem("accessToken");

    const handleLogin = () => navigate("/login");

    const fetchData = async () => {
        try {
            setErrorMessage("");

            const [postData, commentData] = await Promise.all([
                getPost(id),
                getCommentsByPostId(id),
            ]);

            setPost(postData);
            setComments(Array.isArray(commentData) ? commentData : []);
        } catch (error) {
            console.error("조회 실패:", error);
            setErrorMessage(
                error.response?.data?.message || "데이터를 불러오지 못했습니다."
            );
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handlePostDelete = async () => {
        if (!window.confirm("게시글을 삭제하시겠습니까?")) return;

        try {
            await deletePost(id);
            navigate("/boards");
        } catch (error) {
            console.error("게시글 삭제 실패:", error);
            alert(error.response?.data?.message || "게시글 삭제 실패");
        }
    };

    const handleCommentSubmit = async () => {
        if (!commentInput.trim()) return;

        try {
            setSubmittingComment(true);
            await createComment({
                postId: Number(id),
                content: commentInput,
            });
            setCommentInput("");
            await fetchData();
        } catch (error) {
            console.error("댓글 작성 실패:", error);
            alert(error.response?.data?.message || "댓글 작성 실패");
        } finally {
            setSubmittingComment(false);
        }
    };

    const handleCommentDelete = async (commentId) => {
        if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

        try {
            setDeletingCommentId(commentId);
            await deleteComment(commentId);
            await fetchData();
        } catch (error) {
            console.error("댓글 삭제 실패:", error);
            alert(error.response?.data?.message || "댓글 삭제 실패");
        } finally {
            setDeletingCommentId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-5xl">
                <Header
                    isLoggedIn={isLoggedIn}
                    onLogout={onLogout}
                    onLogin={handleLogin}
                />

                <div className="mb-5">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-300"
                    >
                        뒤로가기
                    </button>
                </div>

                {errorMessage ? (
                    <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMessage}
                    </div>
                ) : !post ? (
                    <div className="py-10 text-center">로딩 중...</div>
                ) : (
                    <>
                        <div className="mb-6 rounded-3xl bg-white p-8 shadow-sm">
                            <div className="mb-4 flex items-start justify-between gap-4">
                                <div>
                                    <h1 className="mb-3 text-3xl font-bold text-gray-900">
                                        {post.title}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        작성자: {post.nickname}
                                    </p>
                                </div>

                                {isLoggedIn && post.isOwner && (
                                    <button
                                        onClick={handlePostDelete}
                                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                                    >
                                        게시글 삭제
                                    </button>
                                )}
                            </div>

                            <p className="whitespace-pre-wrap text-base leading-8 text-gray-700">
                                {post.content}
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-sm">
                            <h3 className="mb-6 text-xl font-bold">
                                댓글 {comments.length}
                            </h3>

                            {isLoggedIn ? (
                                <div className="mb-8 flex gap-3">
                                    <input
                                        type="text"
                                        value={commentInput}
                                        onChange={(e) => setCommentInput(e.target.value)}
                                        className="flex-1 rounded-xl border border-gray-200 p-3 outline-none transition focus:border-gray-400"
                                        placeholder="댓글을 입력하세요"
                                    />
                                    <button
                                        onClick={handleCommentSubmit}
                                        disabled={submittingComment}
                                        className="rounded-xl bg-gray-900 px-6 py-2 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {submittingComment ? "등록 중..." : "등록"}
                                    </button>
                                </div>
                            ) : (
                                <p className="mb-8 text-sm text-gray-500">
                                    댓글을 작성하려면 로그인하세요.
                                </p>
                            )}

                            <div className="space-y-4">
                                {comments.length === 0 ? (
                                    <p className="text-sm text-gray-500">
                                        아직 댓글이 없습니다.
                                    </p>
                                ) : (
                                    comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="border-b border-gray-100 pb-4 last:border-b-0"
                                        >
                                            <div className="mb-1 flex items-center justify-between">
                                                <span className="font-bold text-gray-900">
                                                    {comment.nickname}
                                                </span>

                                                {comment.isOwner && (
                                                    <button
                                                        onClick={() =>
                                                            handleCommentDelete(comment.id)
                                                        }
                                                        disabled={
                                                            deletingCommentId === comment.id
                                                        }
                                                        className="text-xs text-red-500 transition hover:text-red-700 disabled:opacity-60"
                                                    >
                                                        {deletingCommentId === comment.id
                                                            ? "삭제 중..."
                                                            : "삭제"}
                                                    </button>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-600">
                                                {comment.content}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default PostDetailPage;