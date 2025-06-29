import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const [form, setForm] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            alert("Something went wrong");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h1>
                    <p className="text-sm text-gray-500 mt-1">Please login to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full mt-2 transition-transform transform hover:scale-105 duration-300"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
