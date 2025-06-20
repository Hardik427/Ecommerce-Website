import React, { useEffect, useState } from "react";
import { useAdminSummaryQuery } from "../../redux/features/admin/adminApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const { data, error, isLoading } = useAdminSummaryQuery();
  const [visible, setVisible] = useState([false, false, false, false]);

  useEffect(() => {
    if (data) {
      Array(4).fill(null).forEach((_, idx) => {
        setTimeout(() => {
          setVisible((prev) => {
            const updated = [...prev];
            updated[idx] = true;
            return updated;
          });
        }, 200 + idx * 200);
      });
    }
  }, [data]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading dashboard</h1>;

  // Dummy monthly data for charts (replace with API data if available)
  const monthlyStats = [
    { month: "Jan", revenue: 12000, orders: 30 },
    { month: "Feb", revenue: 15000, orders: 45 },
    { month: "Mar", revenue: 18000, orders: 50 },
    { month: "Apr", revenue: 22000, orders: 70 },
    { month: "May", revenue: 20000, orders: 65 },
    { month: "Jun", revenue: 25000, orders: 90 },
  ];

  return (
    <section className="section__container bg-extra-light min-h-screen flex flex-col md:flex-row gap-8 py-8">
      {/* Sidebar */}
      <aside className="dashboard__sidebar bg-primary-light rounded-xl p-6 w-full md:w-64 flex-shrink-0 mb-6 md:mb-0">
        <h2 className="section__header text-left mb-6">Dashboard</h2>
        <nav>
          <ul className="nav__links flex flex-col gap-4">
            <li className="link"><a href="/dashboard/profile">Profile</a></li>
            <li className="link"><a href="/dashboard/orders">Orders</a></li>
            <li className="link"><a href="/dashboard/payments">Payments</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white rounded-xl p-8 shadow-md">
        <h1 className="section__header mb-8">Welcome Back, Admin!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card label="Total Revenue" value={`₹${data.totalRevenue.toFixed(2)}`} visible={visible[0]} delay={0} />
          <Card label="Total Orders" value={data.totalOrders} visible={visible[1]} delay={120} />
          <Card label="Total Products" value={data.totalProducts} visible={visible[2]} delay={240} />
          <Card label="Total Customers" value={data.totalCustomers} visible={visible[3]} delay={360} />
        </div>

        {/* Charts */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-bold mb-4">Monthly Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </section>
  );
};

const Card = ({ label, value, visible, delay }) => (
  <div
    className={`categories__card bg-primary-light rounded-lg p-6 text-center shadow-sm transform transition-all duration-700 ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <h4 className="font-header text-lg font-semibold text-text-dark mb-2">
      {label}
    </h4>
    <p className="text-2xl font-bold text-primary">{value}</p>
  </div>
);

export default AdminDashboard;