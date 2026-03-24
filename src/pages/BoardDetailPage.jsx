import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBoard, getBoardById } from "../api/boardApi";

function BoardDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getBoardById(id);
                setBoard(data);
            } catch (err) {
                console.error("게시글 상세 조회 실패:", err);
                setError(err.response?.data?.message || "게시글 조회 실패");
            } finally {
                setLoading(false);
            }
        };

        fetchBoard();
    }, [id]);


    const handleDelete = async () => {
        const confirmed = window.confirm("정말 이 게시글을 삭제할까요?");
        if (!confirmed) {
            return;
        }

        try {
            await deleteBoard(id);
            alert("게시글이 삭제되었습니다.");
            navigate("/boards");
        } catch (err) {
            console.error("게시글 삭제 실패:", err);
            alert(err.response?.data?.message || "게시글 삭제 실패");
        }
    };

    if (loading) return <p>불러오는 중...</p>;
    if (error) return <p>에러: {error}</p>;
    if (!board) return <p>게시글이 없습니다.</p>;

    return (
        <div style={{ marginTop: "30px" }}>
            <button
                onClick={() => navigate("/boards")}
                style={{ marginBottom: "20px" }}
            >
                목록으로
            </button>

            <button onClick={()=> navigate(`/boards/${id}/edit`)}
                    style= {{marginRight : "10px"}}
            >
                수정하러 가기
            </button>

            <button onClick={handleDelete}>삭제</button>

            <h2>게시글 상세</h2>

            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "15px",
                    marginTop: "10px",
                }}
            >
                <p>
                    <strong>ID:</strong> {board.id}
                </p>
                <p>
                    <strong>제목:</strong> {board.name}
                </p>
                <p>
                    <strong>내용:</strong> {board.description}
                </p>
                <p>
                    <strong>작성일:</strong> {board.createdAt}
                </p>
            </div>
        </div>
    );
}

export default BoardDetailPage;