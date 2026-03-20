import { useState } from "react";

function BoardCreateSection({ onBoardCreated }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const createBoard = async () => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            setMessage("먼저 로그인 해주세요.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/boards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    description
                })
            });

            const data = await response.json();
            console.log("게시글 생성 응답:", data);

            if (response.ok) {
                setMessage("게시글 생성 성공!");
                setName("");
                setDescription("");

                onBoardCreated();
            } else {
                setMessage(`게시글 생성 실패: ${data.message || "에러 발생"}`);
            }
        } catch (error) {
            console.error("게시글 생성 에러:", error);
            setMessage(`에러 발생: ${error.message}`);
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

            <button onClick={createBoard}>게시글 생성</button>
            <p>{message}</p>
        </div>
    );
}

export default BoardCreateSection;