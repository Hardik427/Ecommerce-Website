import React, { useEffect, useState } from "react";
import { useAdminSummaryQuery } from "../../redux/features/admin/adminApi";

const AdminDashboard = () => {
  const { data, error, isLoading } = useAdminSummaryQuery();
  const [visible, setVisible] = useState([false, false, false, false]);

  // Trigger animation when data is loaded
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            label="Total Revenue"
            value={`₹${data.totalRevenue.toFixed(2)}`}
            visible={visible[0]}
            delay={0}
          />
          <Card
            label="Total Orders"
            value={data.totalOrders}
            visible={visible[1]}
            delay={120}
          />
          <Card
            label="Total Products"
            value={data.totalProducts}
            visible={visible[2]}
            delay={240}
          />
          <Card
            label="Total Customers"
            value={data.totalCustomers}
            visible={visible[3]}
            delay={360}
          />
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
