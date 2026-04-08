import { useState } from "react";
import { createPost } from "../api/postApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";

function PostCreatePage({ onLogout }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const boardId = searchParams.get("boardId");
    const isLoggedIn = !!localStorage.getItem("accessToken");

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSubmit = async () => {
        if (!boardId) {
            setMessage("게시판 정보가 없습니다.");
            return;
        }

        if (!title.trim() || !content.trim()) {
            setMessage("제목과 내용을 입력해주세요.");
            return;
        }

        try {
            await createPost({
                boardId: Number(boardId),
                title,
                content,
                isAnonymous: false,
            });

            navigate(`/boards/${boardId}`);
        } catch (error) {
            console.error("게시글 작성 실패:", error);
            setMessage(error.response?.data?.message || "게시글 작성에 실패했습니다.");
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
                        onClick={() => {
                            if (boardId) {
                                navigate(`/boards/${boardId}`);
                            } else {
                                navigate("/boards");
                            }
                        }}
                        className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-300"
                    >
                        목록으로
                    </button>
                </div>

                <div className="rounded-3xl bg-white p-8 shadow-sm">
                    <h1 className="mb-6 text-3xl font-bold text-gray-900">
                        글쓰기
                    </h1>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-base outline-none transition focus:border-gray-400"
                        />
                    </div>

                    <div className="mb-4">
                        <textarea
                            placeholder="내용을 입력하세요"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="10"
                            className="w-full resize-y rounded-2xl border border-gray-200 px-4 py-3 text-base outline-none transition focus:border-gray-400"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                        작성 완료
                    </button>

                    {message && (
                        <p className="mt-4 text-sm text-red-600">{message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostCreatePage;