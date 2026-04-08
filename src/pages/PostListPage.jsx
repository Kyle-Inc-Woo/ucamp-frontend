import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function PostListPage({ onLogout }) {
    const [posts, setPosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem("accessToken");

    const handleLogin = () => {
        navigate("/login");
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                console.error("게시글 목록 조회 실패:", error);
                setErrorMessage("게시글 목록을 불러오지 못했습니다.");
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-5xl">
                <Header
                    isLoggedIn={isLoggedIn}
                    onLogout={onLogout}
                    onLogin={handleLogin}
                />

                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">게시글 목록</h1>
                        <p className="mt-2 text-sm text-gray-500">
                            최신 게시글을 확인해보세요.
                        </p>
                    </div>

                    {isLoggedIn && (
                        <button
                            onClick={() => navigate("/posts/create")}
                            className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                        >
                            글쓰기
                        </button>
                    )}
                </div>

                {errorMessage && (
                    <div className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMessage}
                    </div>
                )}

                {posts.length === 0 && !errorMessage ? (
                    <div className="rounded-3xl bg-white px-6 py-10 text-center text-gray-500 shadow-sm">
                        게시글이 없습니다.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostListPage;