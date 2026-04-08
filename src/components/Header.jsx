function Header({ isLoggedIn, onLogout, onLogin }) {
    const nickname = localStorage.getItem("nickname") || "사용자";

    return (
        <div className="mx-auto mb-8 flex max-w-5xl items-center justify-between">
            <div>
                <p className="m-0 text-sm text-gray-500">안녕하세요,</p>
                <h2 className="mt-1 text-3xl font-bold text-gray-900">
                    {nickname}님 👋
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