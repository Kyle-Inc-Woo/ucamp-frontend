function Header({ isLoggedIn, onLogout, onLogin }) {
    const nickname = localStorage.getItem("nickname");
    const displayName = nickname && nickname !== "undefined" ? nickname : "게스트";

    return (
        <div className="mx-auto mb-8 flex max-w-5xl items-center justify-between">
            <div>
                <p className="m-0 text-sm text-gray-500">
                    {isLoggedIn ? "안녕하세요," : "환영합니다,"}
                </p>
                <h2 className="mt-1 text-3xl font-bold text-gray-900">
                    {displayName}님 👋
                </h2>
            </div>

            {isLoggedIn ? (
                <button
                    onClick={onLogout}
                    className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                    로그아웃
                </button>
            ) : (
                <button
                    onClick={onLogin}
                    className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                    로그인
                </button>
            )}
        </div>
    );
}

export default Header;