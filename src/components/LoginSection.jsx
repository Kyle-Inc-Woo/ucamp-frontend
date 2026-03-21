import { useState } from "react";
import { login } from "../api/authApi";

function LoginSection({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        try {
            setMessage("로그인 요청 중...");

            const data = await login(email, password);

            localStorage.setItem("accessToken", data.accessToken);
            setMessage("로그인 성공!");

            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } catch (error) {
            console.error("에러:", error);

            const message =
                error.response?.data?.message || "로그인 실패 또는 서버 오류";

            setMessage(`에러 발생: ${message}`);
        }
    };

    return (
        <div style={{ marginBottom: "30px" }}>
            <h1>Login</h1>

            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />

            <button onClick={handleLogin}>Login</button>

            <p>{message}</p>
        </div>
    );
}

export default LoginSection;