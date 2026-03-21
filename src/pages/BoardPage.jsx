import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardCreateSection from "../components/BoardCreateSection";
import BoardList from "../components/BoardList";

function BoardPage({ onLogout }) {
    const [refreshCount, setRefreshCount] = useState(0);
    const navigate = useNavigate();

    const handleBoardCreated = () => {
        setRefreshCount((prev) => prev + 1);
    };

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        navigate("/login");
    };

    return (
        <div>
            <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
                로그아웃
            </button>

            <BoardCreateSection onBoardCreated={handleBoardCreated} />
            <BoardList refreshCount={refreshCount} />
        </div>
    );
}

export default BoardPage;