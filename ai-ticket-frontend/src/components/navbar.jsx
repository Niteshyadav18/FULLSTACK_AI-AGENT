import {Link, useNavigate} from "react-router-dom";

export default function Navbar() {
    const token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (user) {
        user = JSON.parse(user);
    }
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="bg-[#0f172a] px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-700">
            <div className="text-2xl font-bold text-indigo-400">
                <Link to="/">Ticket AI</Link>
            </div>

            <div className="flex items-center gap-4 text-sm">
                {!token ? (
                    <>
                        <Link
                            to="/signup"
                            className="px-3 py-1 rounded-lg text-gray-200 hover:bg-indigo-600 transition"
                        >
                            Signup
                        </Link>
                        <Link to="/login" className="px-3 py-1 rounded-lg text-gray-200 hover:bg-indigo-600 transition">
                            Login
                        </Link>
                    </>
                ) : (
                    <>
                        <p className="text-gray-300">
                            Hi, <span className="font-medium text-white">{user?.email}</span>
                        </p>

                        {user?.role === "admin" && (
                            <Link
                                to="/admin"
                                className="px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                            >
                                Admin
                            </Link>
                        )}
                        <button
                            onClick={logout}
                            className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
