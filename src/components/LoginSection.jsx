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

            if (data.nickname) {
                localStorage.setItem("nickname", data.nickname);
            }

            setMessage("로그인 성공!");

            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } catch (error) {
            console.error("에러:", error);
            const message =
                error.response?.data?.message || "로그인 실패";

            setMessage(`에러: ${message}`);
        }
    };

    return (
        <div className="space-y-4">

            {/* 이메일 */}
            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
            />

            {/* 비밀번호 */}
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
            />

            {/* 버튼 */}
            <button
                onClick={handleLogin}
                className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
                로그인
            </button>

            {/* 메시지 */}
            {message && (
                <p className="text-center text-sm text-gray-500">
                    {message}
                </p>
            )}
        </div>
    );
}

export default LoginSection;