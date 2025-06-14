import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Tickets() {
    const [form, setForm] = useState({title: "", description: ""});
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const fetchTickets = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
                headers: {Authorization: `Bearer ${token}`},
                method: "GET",
            });
            const data = await res.json();
            setTickets(data.tickets || []);
        } catch (err) {
            console.error("Failed to fetch tickets:", err);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                setForm({title: "", description: ""});
                fetchTickets();
            } else {
                alert(data.message || "Ticket creation failed");
            }
        } catch (err) {
            alert("Error creating ticket");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">🎫 Create Ticket</h2>

                <form onSubmit={handleSubmit} className="bg-[#1e293b] p-6 rounded-xl shadow-lg space-y-4 mb-10">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Ticket Title"
                        className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Ticket Description"
                        className="w-full h-28 p-3 rounded-lg bg-[#0f172a] border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    ></textarea>
                    <button
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Ticket"}
                    </button>
                </form>

                <h2 className="text-2xl font-semibold mb-4">📋 All Tickets</h2>
                <div className="space-y-4">
                    {tickets.map((ticket) => (
                        <Link
                            key={ticket._id}
                            to={`/tickets/${ticket._id}`}
                            className="block bg-[#1e293b] hover:bg-[#273549] p-5 rounded-xl shadow-md transition duration-200"
                        >
                            <h3 className="text-lg font-bold text-indigo-300 mb-1">{ticket.title}</h3>
                            <p className="text-gray-300">{ticket.description}</p>
                            <p className="text-xs text-gray-500 mt-2">
                                Created At: {new Date(ticket.createdAt).toLocaleString()}
                            </p>
                        </Link>
                    ))}
                    {tickets.length === 0 && <p className="text-gray-400">No tickets submitted yet.</p>}
                </div>
            </div>
        </div>
    );
}
