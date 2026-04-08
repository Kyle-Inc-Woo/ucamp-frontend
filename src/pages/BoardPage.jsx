import { useNavigate } from "react-router-dom";
import BoardList from "../components/BoardList";
import Header from "../components/Header";

function BoardPage({ onLogout }) {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("accessToken");

    const handleLogin = () => {
        navigate("/login");
    };

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
                        <h1 className="text-3xl font-bold text-gray-900">게시판 목록</h1>
                        <p className="mt-2 text-sm text-gray-500">
                            원하는 게시판을 선택해서 글을 둘러보세요.
                        </p>
                    </div>
                </div>

                <BoardList />
            </div>
        </div>
    );
}

export default BoardPage;