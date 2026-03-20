import { useState } from "react";

function LoginSection() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        try {
            setMessage("로그인 요청 중...");

            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();
            console.log("응답:", data);

            if (response.ok) {
                localStorage.setItem("accessToken", data.accessToken);
                setMessage("로그인 성공!");
            } else {
                setMessage(`로그인 실패: ${data.message || "에러 발생"}`);
            }
        } catch (error) {
            console.error("에러:", error);
            setMessage(`에러 발생: ${error.message}`);
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