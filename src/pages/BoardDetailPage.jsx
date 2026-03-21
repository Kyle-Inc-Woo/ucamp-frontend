import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    deleteBoard,
    getBoardById,
    updateBoard,
} from "../api/boardApi";

function BoardDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");

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

    const handleStartEdit = () => {
        if (!board) return;

        setEditName(board.name);
        setEditDescription(board.description);
        setIsEditing(true);
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (!editName.trim() || !editDescription.trim()) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        try {
            const data = await updateBoard(id, editName, editDescription, token);

            alert("게시글이 수정되었습니다.");
            setBoard(data);
            setIsEditing(false);
        } catch (err) {
            console.error("게시글 수정 실패:", err);
            alert(err.response?.data?.message || "게시글 수정 실패");
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        const confirmed = window.confirm("정말 이 게시글을 삭제할까요?");
        if (!confirmed) {
            return;
        }

        try {
            await deleteBoard(id, token);
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
                ← 목록으로
            </button>

            <h2>게시글 상세</h2>

            {!isEditing ? (
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

                    <button onClick={handleStartEdit} style={{ marginRight: "10px" }}>
                        수정
                    </button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
            ) : (
                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "15px",
                        marginTop: "10px",
                    }}
                >
                    <div style={{ marginBottom: "10px" }}>
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="제목"
                        />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
            <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="내용"
                rows="5"
                cols="50"
            />
                    </div>

                    <button onClick={handleUpdate} style={{ marginRight: "10px" }}>
                        수정 완료
                    </button>
                    <button onClick={() => setIsEditing(false)}>취소</button>
                </div>
            )}
        </div>
    );
}

export default BoardDetailPage;