import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBoards } from "../api/boardApi";

function BoardList({ refreshCount }) {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const fetchBoards = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getBoards();
            setBoards(data);
        } catch (error) {
            console.error("게시글 목록 불러오기 실패:", error);
            setError(error.response?.data?.message || "게시글 목록 조회 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, [refreshCount]);

    if (loading) {
        return <p>게시글 목록 불러오는 중...</p>;
    }

    if (error) {
        return <p>에러: {error}</p>;
    }

    return (
        <div style={{ marginTop: "30px" }}>
            <h2>게시글 목록</h2>

            {boards.length === 0 ? (
                <p>게시글이 없습니다.</p>
            ) : (
                boards.map((board) => (
                    <div
                        key={board.id}
                        onClick={() => navigate(`/boards/${board.id}`)}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                            cursor: "pointer",
                        }}
                    >
                        <h3>{board.name}</h3>
                        <p>{board.description}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default BoardList;