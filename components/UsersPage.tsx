import React, { useEffect, useState } from "react";

interface LoginRecord {
  name: string | null;
  email: string | null;
  provider?: string;
  at: number;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<LoginRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/getUsers")
      .then((r) => r.json())
      .then((data) => {
        setUsers(data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch users", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Recent Logins</h2>
      {loading ? <div>Loading...</div> : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {users.length === 0 && <div className="text-slate-500">No recent logins.</div>}
          {users.map((u, i) => (
            <div key={i} className="p-2 border-b last:border-b-0">
              <div className="font-medium">{u.name ?? "Unknown"}</div>
              <div className="text-xs text-slate-500">{u.email ?? "—"} • {u.provider ?? "linkedin"}</div>
              <div className="text-xs text-slate-400">{new Date(u.at).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;
