import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminStats } from "../../api/api-admin";
import type { IAdminStats } from "../../types/admin-stats";

const Dashboard = () => {
  const [stats, setStats] = useState<IAdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!stats) {
    return <div>No stats available</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Products: {stats.totalProducts}</p>
      <Link to="/admin/products">Manage Products</Link>
    </div>
  );
};

export default Dashboard;
