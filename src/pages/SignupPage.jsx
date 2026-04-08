import { useNavigate } from "react-router-dom";
import SignupSection from "../components/SignupSection";

function SignupPage() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        UCAMP
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        회원가입 후 서비스를 이용해보세요
                    </p>
                </div>

                <SignupSection />

                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                        이미 계정이 있나요? 로그인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;