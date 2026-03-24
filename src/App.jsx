import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import BoardPage from "./pages/BoardPage.jsx";
import BoardCreatePage from "./pages/BoardCreatePage.jsx";
import BoardDetailPage from "./pages/BoardDetailPage.jsx";
import BoardEditPage from "./pages/BoardEditPage.jsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("accessToken")
    );

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            <div style={{ padding: "20px" }}>
                <h1>UCAMP</h1>
                <h3>현재 상태: {isLoggedIn ? "로그인됨" : "로그인 안 됨"}</h3>

                <Routes>
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/boards" replace />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/boards" replace />
                            ) : (
                                <LoginPage onLoginSuccess={handleLoginSuccess} />
                            )
                        }
                    />

                    <Route
                        path="/boards"
                        element={
                            isLoggedIn ? (
                                <BoardPage onLogout={handleLogout} />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/boards/new"
                        element={
                            isLoggedIn ? (
                                <BoardCreatePage/>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/boards/:id"
                        element={
                            isLoggedIn ? (
                                <BoardDetailPage />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/boards/:id/edit"
                        element={
                            isLoggedIn ? (
                                <BoardEditPage/>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;