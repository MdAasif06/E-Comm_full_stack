import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/admin/analytics");
      setStats(data);
    } catch (error) {
      console.error("Stats error:", error);
    }
  };

  const fetchRevenueChart = async () => {
    try {
      const { data } = await API.get("/admin/monthly-revenue");

      // 12 months initialize karo
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const formattedData = months.map((month, index) => {
        const monthData = data.find((item) => item._id === index + 1);
        return {
          month,
          revenue: monthData ? monthData.totalRevenue : 0,
        };
      });

      setChartData(formattedData);
    } catch (error) {
      console.error("Chart error:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRevenueChart();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-[#ef4444] text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <p className="text-xl opacity-70 mb-2 text-black font-bold ">Total Revenue</p>
          <h2 className="text-2xl font-bold tracking-wide">
            ₹ {stats.totalRevenue || 0}
          </h2>
        </div>

        {/* Total Orders */}
        <div className="bg-[#ef4444] text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <p className="text-xl opacity-70 mb-2 text-black font-bold">Total Orders</p>
          <h2 className="text-2xl font-bold tracking-wide">
            {stats.totalOrders || 0}
          </h2>
        </div>

        {/* Total Products */}
        <div className="bg-[#ef4444] text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <p className="text-xl opacity-70 mb-2 text-black font-bold">Total Products</p>
          <h2 className="text-2xl font-bold tracking-wide">
            {stats.totalProducts || 0}
          </h2>
        </div>

        {/* Low Stock */}
        <div className="bg-[#ef4444] text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <p className="text-xl opacity-70 mb-2 text-black font-bold">Low Stock</p>
          <h2 className="text-2xl font-bold tracking-wide">
            {stats.lowStockCount || 0}
          </h2>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Revenue Chart</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
