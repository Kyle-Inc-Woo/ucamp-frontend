import { useEffect, useState } from "react";

function BoardList({ refreshCount }) {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBoards = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("http://localhost:8080/boards");

            if (!response.ok) {
                throw new Error("게시글 목록 조회 실패");
            }

            const data = await response.json();
            setBoards(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, [refreshCount]);

    return (
        <div>
            <h2>게시글 목록</h2>

            {loading && <p>불러오는 중...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && boards.length === 0 && (
                <p>게시글이 없습니다.</p>
            )}

            {!loading && !error && boards.map((board) => (
                <div
                    key={board.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "12px",
                        marginBottom: "12px",
                        borderRadius: "8px"
                    }}
                >
                    <h3>{board.name}</h3>
                    <p>{board.description}</p>
                    <small>ID: {board.id}</small>
                </div>
            ))}
        </div>
    );
}

export default BoardList;