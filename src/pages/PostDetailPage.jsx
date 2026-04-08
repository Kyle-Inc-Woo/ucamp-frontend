import { useEffect, useState } from "react";
import { getPost, deletePost } from "../api/postApi";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function PostDetailPage({ onLogout }) {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem("accessToken");
    const currentUserId = Number(localStorage.getItem("userId"));
    const isOwner = post && currentUserId === post.userId;

    const handleLogin = () => {
        navigate("/login");
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPost(id);
                setPost(data);
            } catch (error) {
                console.error("게시글 상세 조회 실패:", error);
                setErrorMessage("게시글을 불러오지 못했습니다.");
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        const confirmed = window.confirm("정말 이 게시글을 삭제할까요?");
        if (!confirmed) return;

        try {
            await deletePost(id);
            navigate("/posts");
        } catch (error) {
            console.error("게시글 삭제 실패:", error);

            const message =
                error.response?.data?.message || "게시글 삭제에 실패했습니다.";

            alert(message);
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
                        onClick={() => navigate("/posts")}
                        className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-300"
                    >
                        목록으로
                    </button>
                </div>

                {errorMessage ? (
                    <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMessage}
                    </div>
                ) : !post ? (
                    <div className="rounded-3xl bg-white px-6 py-10 text-center text-gray-500 shadow-sm">
                        불러오는 중...
                    </div>
                ) : (
                    <div className="rounded-3xl bg-white p-8 shadow-sm">
                        <h1 className="mb-4 text-3xl font-bold text-gray-900">
                            {post.title}
                        </h1>

                        <p className="mb-2 text-sm text-gray-500">
                            작성자: {post.isAnonymous ? "익명" : post.nickname}
                        </p>

                        <p className="whitespace-pre-wrap text-base leading-8 text-gray-700">
                            {post.content}
                        </p>

                        {isLoggedIn && isOwner && (
                            <div className="mt-8 flex gap-3">
                                <button
                                    onClick={handleDelete}
                                    className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                                >
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostDetailPage;