import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBoards } from "../api/boardApi";

function BoardList() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getBoards();
                setBoards(data);
            } catch (error) {
                console.error("게시판 목록 불러오기 실패:", error);
                setError(error.response?.data?.message || "게시판 목록 조회 실패");
            } finally {
                setLoading(false);
            }
        };

        fetchBoards();
    }, []);

    if (loading) {
        return <p className="text-sm text-gray-500">게시판 목록 불러오는 중...</p>;
    }

    if (error) {
        return <p className="text-sm text-red-600">에러: {error}</p>;
    }

    return (
        <div className="space-y-4">
            {boards.length === 0 ? (
                <div className="rounded-3xl bg-white px-6 py-10 text-center text-gray-500 shadow-sm">
                    게시판이 없습니다.
                </div>
            ) : (
                boards.map((board) => (
                    <div
                        key={board.id}
                        onClick={() => navigate(`/boards/${board.id}`)}
                        className="cursor-pointer rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <h3 className="text-xl font-semibold text-gray-900">
                            {board.name}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            {board.description}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default BoardList;