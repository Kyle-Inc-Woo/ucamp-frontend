import { useState } from "react";
import { signup } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function SignupSection() {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!email.trim() || !nickname.trim() || !password.trim() || !passwordConfirm.trim()) {
            setMessage("모든 항목을 입력해주세요.");
            return;
        }

        if (password !== passwordConfirm) {
            setMessage("비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        try {
            setMessage("회원가입 요청 중...");

            await signup({
                email,
                nickname,
                password,
            });

            alert("회원가입이 완료되었습니다. 로그인해주세요.");
            navigate("/login");
        } catch (error) {
            console.error("회원가입 실패:", error);
            setMessage(
                error.response?.data?.message || "회원가입에 실패했습니다."
            );
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
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
            />

            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
            />

            <input
                type="password"
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
            />

            <button
                onClick={handleSignup}
                className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
                회원가입
            </button>

            {message && (
                <p className="text-center text-sm text-gray-500">{message}</p>
            )}
        </div>
    );
}

export default SignupSection;