import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function TicketDetailsPage() {
    const {id} = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (res.ok && data.ticket) {
                    setTicket(data.ticket);
                } else {
                    alert(data.message || "Failed to fetch ticket");
                }
            } catch (err) {
                console.error("Fetch failed:", err);
                alert("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id]);

    if (loading) return <div className="text-center mt-10 text-gray-400">Loading ticket details...</div>;
    if (!ticket) return <div className="text-center mt-10 text-gray-400">Ticket not found</div>;

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">🎟️ Ticket Details</h1>

                <div className="bg-[#1e293b] p-6 rounded-2xl shadow-xl space-y-5">
                    <h2 className="text-2xl font-bold text-white">{ticket.title || "Untitled"}</h2>
                    <p className="text-gray-300">{ticket.description || "No description provided."}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-700">
                        <div>
                            <p className="text-gray-400 font-semibold">Status</p>
                            <p className="text-green-400">{ticket.status || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 font-semibold">Priority</p>
                            <p className="text-yellow-300">{ticket.priority || "N/A"}</p>
                        </div>
                        {ticket.assignedTo?.email && (
                            <div className="sm:col-span-2">
                                <p className="text-gray-400 font-semibold">Assigned To</p>
                                <p>{ticket.assignedTo.email}</p>
                            </div>
                        )}
                    </div>

                    {ticket.relatedSkills?.length > 0 && (
                        <div>
                            <p className="text-gray-400 font-semibold">Related Skills</p>
                            <p className="text-blue-300">{ticket.relatedSkills.join(", ")}</p>
                        </div>
                    )}

                    {ticket.helpfulNotes && (
                        <div>
                            <p className="text-gray-400 font-semibold mb-1">Helpful Notes</p>
                            <div className="prose prose-invert max-w-none text-gray-200">
                                <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
                            </div>
                        </div>
                    )}

                    {ticket.createdAt && (
                        <p className="text-sm text-gray-500">
                            Created At: {new Date(ticket.createdAt).toLocaleString()}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
