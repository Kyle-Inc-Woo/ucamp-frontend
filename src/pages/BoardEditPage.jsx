import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBoardById, updateBoard } from "../api/boardApi";

function BoardEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const data = await getBoardById(id);
                setName(data.name);
                setDescription(data.description);
            } catch (error) {
                console.error("게시글 불러오기 실패:", error);
                setMessage(error.response?.data?.message || "게시글 조회 실패");
            } finally {
                setLoading(false);
            }
        };

        fetchBoard();
    }, [id]);

    const handleUpdate = async () => {
        if (!name.trim() || !description.trim()) {
            setMessage("제목과 내용을 입력해주세요.");
            return;
        }

        try {
            await updateBoard(id, name, description);
            alert("게시글이 수정되었습니다.");
            navigate(`/boards/${id}`);
        } catch (error) {
            console.error("게시글 수정 실패:", error);
            setMessage(error.response?.data?.message || "게시글 수정 실패");
        }
    };

    if (loading) {
        return <p>불러오는 중...</p>;
    }

    return (
        <div style={{ marginTop: "30px" }}>
            <div style={{ marginBottom: "20px" }}>
                <button onClick={() => navigate(`/boards/${id}`)}>
                    ← 상세로 돌아가기
                </button>
            </div>

            <h2>게시글 수정</h2>

            <input
                type="text"
                placeholder="게시글 제목"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />

            <textarea
                placeholder="게시글 내용"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="6"
                cols="50"
            />
            <br />
            <br />

            <button onClick={handleUpdate}>수정 완료</button>

            {message && <p>{message}</p>}
        </div>
    );
}

export default BoardEditPage;