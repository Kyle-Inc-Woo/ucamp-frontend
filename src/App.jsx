import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

import BoardPage from "./pages/BoardPage.jsx";
import BoardDetailPage from "./pages/BoardDetailPage.jsx";

import PostListPage from "./pages/PostListPage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import PostCreatePage from "./pages/PostCreatePage.jsx";

function App() {
    const [authVersion, setAuthVersion] = useState(0);

    const isLoggedIn = !!localStorage.getItem("accessToken");

    const handleLoginSuccess = () => {
        setAuthVersion((prev) => prev + 1);
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("nickname");
        localStorage.removeItem("userId");
        setAuthVersion((prev) => prev + 1);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/boards" replace />} />

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
                    path="/signup"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/boards" replace />
                        ) : (
                            <SignupPage />
                        )
                    }
                />

                <Route
                    path="/boards"
                    element={
                        <BoardPage
                            key={`boards-${authVersion}`}
                            onLogout={handleLogout}
                        />
                    }
                />

                <Route
                    path="/boards/:id"
                    element={
                        <BoardDetailPage
                            key={`board-detail-${authVersion}`}
                            onLogout={handleLogout}
                        />
                    }
                />

                <Route
                    path="/posts"
                    element={
                        <PostListPage
                            key={`posts-${authVersion}`}
                            onLogout={handleLogout}
                        />
                    }
                />

                <Route
                    path="/posts/create"
                    element={
                        isLoggedIn ? (
                            <PostCreatePage onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                <Route
                    path="/posts/:id"
                    element={
                        <PostDetailPage
                            key={`post-detail-${authVersion}`}
                            onLogout={handleLogout}
                        />
                    }
                />

                <Route path="*" element={<Navigate to="/boards" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;