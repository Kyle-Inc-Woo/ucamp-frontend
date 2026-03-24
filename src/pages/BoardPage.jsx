import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardList from "../components/BoardList";

function BoardPage({ onLogout }) {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const navigate = useNavigate();

    const handleBoardCreated = () => {
        setRefreshTrigger((prev) => !prev);
    };

    return (
        <div>
            <div style = {{ marginBottom : "20px"}}>
                <button onClick={onLogout} style={{ marginBottom: "20px" }}>
                    로그아웃
                </button>

                <button onClick={()=> navigate("/boards/new")}>
                    글쓰기
                </button>
            </div>

            <BoardList refreshTrigger={refreshTrigger} onBoardcreated={handleBoardCreated}/>
        </div>
    );
}

export default BoardPage;