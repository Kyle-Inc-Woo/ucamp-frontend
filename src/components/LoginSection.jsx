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
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("nickname", data.nickname);
            localStorage.setItem("userId", String(data.userId));

            setMessage("로그인 성공!");

            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } catch (error) {
            console.error("로그인 에러:", error);
            const errMsg = error.response?.data?.message || "로그인 실패";
            setMessage(`에러: ${errMsg}`);
        }
    };

    return (
        <div className="space-y-4">
            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
            />
            <button
                onClick={handleLogin}
                className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
                로그인
            </button>

            {message && (
                <p className="text-center text-sm text-gray-500">{message}</p>
            )}
        </div>
    );
}

export default LoginSection;