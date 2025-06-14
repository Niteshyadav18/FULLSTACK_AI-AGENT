import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function SignupPage() {
    const [form, setForm] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: form.email, password: form.password}),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
            } else {
                alert(data.message || "Signup failed");
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
                    <h1 className="text-3xl font-bold text-gray-800">Create Account 🎉</h1>
                    <p className="text-sm text-gray-500 mt-1">Join us by creating your account</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
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
                        placeholder="Create a password"
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-full transition-transform transform hover:scale-105 duration-300"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary font-medium hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}
