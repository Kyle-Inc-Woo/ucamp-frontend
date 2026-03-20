import { useState} from "react";

import LoginSection from "./pages/LoginSection";
import BoardCreateSection from "./pages/BoardCreateSection";
import BoardList from "./pages/BoardList";

function App() {
    const [refreshCount, setRefreshCount] = useState(0);

    const handleBoardCreated = () => {
        setRefreshCount((prev) => prev + 1);
    }
    return (
        <div style={{ padding: "20px" }}>
            <LoginSection />
            <BoardCreateSection onBoardCreated={handleBoardCreated}/>
            <BoardList refreshCount={refreshCount}/>
        </div>
    );
}

export default App;