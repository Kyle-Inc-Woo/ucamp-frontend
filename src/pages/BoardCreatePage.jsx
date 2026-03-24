import {useNavigate} from "react-router-dom";
import BoardCreateSection from "../components/BoardCreateSection.jsx";

function BoardCreatePage() {
    const navigate = useNavigate();

    const handleBoardCreated = () => {
        navigate("/boards");
    }

    return(
        <div>
            <div style = {{ marginBottom: "20px"}}>
                <button onClick={()=> navigate("/boards")}>
                    목록으로
                </button>
            </div>

            <h2>게시글 작성</h2>

            <BoardCreateSection onBoardCreated={handleBoardCreated}/>
        </div>
    );
}

export default BoardCreatePage;