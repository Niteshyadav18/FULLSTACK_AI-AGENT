import {useEffect, useState} from "react";

export default function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({role: "", skills: ""});
    const [searchQuery, setSearchQuery] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/users`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            const data = await res.json();
            if (res.ok) {
                setUsers(data);
                setFilteredUsers(data);
            } else {
                console.error(data.error);
            }
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user.email);
        setFormData({
            role: user.role,
            skills: user.skills?.join(", "),
        });
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/update-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: editingUser,
                    role: formData.role,
                    skills: formData.skills
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                }),
            });

            const data = await res.json();
            if (!res.ok) return console.error(data.error || "Update failed");

            setEditingUser(null);
            setFormData({role: "", skills: ""});
            fetchUsers();
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredUsers(users.filter((user) => user.email.toLowerCase().includes(query)));
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Admin Panel - Manage Users</h2>

            <input
                type="text"
                className="input input-bordered w-full mb-6 bg-gray-800 text-white placeholder-gray-400"
                placeholder="Search by email"
                value={searchQuery}
                onChange={handleSearch}
            />

            {filteredUsers.map((user) => (
                <div key={user._id} className="bg-[#1e293b] border border-gray-700 p-5 rounded-lg mb-5 shadow-md">
                    <p>
                        <strong>Email:</strong> {user.email}
                        {user.role === "admin" && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-600 rounded-full text-white">
                                Admin
                            </span>
                        )}
                    </p>
                    <p>
                        <strong>Current Role:</strong> {user.role}
                    </p>
                    <p>
                        <strong>Skills:</strong> {user.skills?.length ? user.skills.join(", ") : "N/A"}
                    </p>

                    {editingUser === user.email ? (
                        <div className="mt-4 space-y-2">
                            <select
                                className="select select-bordered w-full bg-gray-800 text-white"
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                            >
                                <option value="user">User</option>
                                <option value="moderator">Moderator</option>
                                <option value="admin">Admin</option>
                            </select>

                            <input
                                type="text"
                                className="input input-bordered w-full bg-gray-800 text-white"
                                placeholder="Comma-separated skills"
                                value={formData.skills}
                                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                            />

                            <div className="flex gap-2">
                                <button className="btn btn-success btn-sm" onClick={handleUpdate}>
                                    Save
                                </button>
                                <button className="btn btn-outline btn-sm" onClick={() => setEditingUser(null)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button className="btn btn-primary btn-sm mt-3" onClick={() => handleEditClick(user)}>
                            Edit
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
