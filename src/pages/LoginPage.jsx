import { useNavigate } from "react-router-dom";
import LoginSection from "../components/LoginSection";

function LoginPage({ onLoginSuccess }) {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        if (onLoginSuccess) {
            onLoginSuccess();
        }
        navigate("/boards");
    };

    return (
        <div>
            <LoginSection onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}

export default LoginPage;