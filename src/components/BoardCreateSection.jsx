import { useState } from "react";
import { createBoard } from "../api/boardApi";

function BoardCreateSection({ onBoardCreated }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleCreateBoard = async () => {
       if (!name.trim() || !description.trim()) {
           setMessage("제목과 내용을 입력해주세요. ");
           return;
       }

        try {
            await createBoard(name, description,);

            setMessage("게시글 생성 성공!");
            setName("");
            setDescription("");

            if (onBoardCreated) {
                onBoardCreated();
            }
        } catch (error) {
            console.error("게시글 생성 실패:", error);

            const message =
                error.response?.data?.message || "게시글 생성 실패";

            setMessage(message);
        }
    };

    return (
        <div style={{ marginBottom: "30px" }}>
            <h2>게시글 생성</h2>

            <input
                type="text"
                placeholder="게시글 제목"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />

            <input
                type="text"
                placeholder="게시글 내용"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <br />

            <button onClick={handleCreateBoard}>게시글 생성</button>

            <p>{message}</p>
        </div>
    );
}

export default BoardCreateSection;