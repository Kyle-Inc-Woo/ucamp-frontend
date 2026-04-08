import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBoardById } from "../api/boardApi";
import { getPostsByBoardId } from "../api/postApi";
import Header from "../components/Header";

function BoardDetailPage({ onLogout }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const isLoggedIn = !!localStorage.getItem("accessToken");

    const handleLogin = () => {
        navigate("/login");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");

                const boardData = await getBoardById(id);
                const postData = await getPostsByBoardId(id);

                setBoard(boardData);
                setPosts(postData);
            } catch (err) {
                console.error("게시판 조회 실패:", err);
                setError(err.response?.data?.message || "게시판을 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 px-5 py-10">
                <div className="mx-auto max-w-5xl">
                    <Header
                        isLoggedIn={isLoggedIn}
                        onLogout={onLogout}
                        onLogin={handleLogin}
                    />
                    <p className="text-sm text-gray-500">불러오는 중...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 px-5 py-10">
                <div className="mx-auto max-w-5xl">
                    <Header
                        isLoggedIn={isLoggedIn}
                        onLogout={onLogout}
                        onLogin={handleLogin}
                    />
                    <p className="text-sm text-red-600">에러: {error}</p>
                </div>
            </div>
        );
    }

    if (!board) {
        return (
            <div className="min-h-screen bg-gray-50 px-5 py-10">
                <div className="mx-auto max-w-5xl">
                    <Header
                        isLoggedIn={isLoggedIn}
                        onLogout={onLogout}
                        onLogin={handleLogin}
                    />
                    <p className="text-sm text-gray-500">게시판이 없습니다.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-5xl">
                <Header
                    isLoggedIn={isLoggedIn}
                    onLogout={onLogout}
                    onLogin={handleLogin}
                />

                <div className="mb-6">
                    <button
                        onClick={() => navigate("/boards")}
                        className="mb-5 rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-300"
                    >
                        목록으로
                    </button>

                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {board.name}
                            </h1>
                            <p className="mt-2 text-sm text-gray-500">
                                {board.description}
                            </p>
                        </div>

                        {isLoggedIn && (
                            <button
                                onClick={() => navigate(`/posts/create?boardId=${board.id}`)}
                                className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                            >
                                글쓰기
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    {posts.length === 0 ? (
                        <div className="rounded-3xl bg-white px-6 py-10 text-center text-gray-500 shadow-sm">
                            아직 게시글이 없습니다.
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div
                                key={post.id}
                                onClick={() => navigate(`/posts/${post.id}`)}
                                className="cursor-pointer rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                    {post.title}
                                </h3>
                                <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                                    {post.content}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default BoardDetailPage;