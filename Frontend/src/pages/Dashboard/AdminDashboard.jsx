import React, { useEffect, useState } from "react";

const stats = [
  { label: "Total Orders", value: 150 },
  { label: "Revenue", value: "$15,000" },
  { label: "Customers", value: "1,200" },
  { label: "Products", value: 340 },
];

const AdminDashboard = () => {
  const [visible, setVisible] = useState([false, false, false, false]);

  useEffect(() => {
    // Staggered reveal for each card
    stats.forEach((_, idx) => {
      setTimeout(() => {
        setVisible((prev) => {
          const updated = [...prev];
          updated[idx] = true;
          return updated;
        });
      }, 200 + idx * 200);
    });
  }, []);

  return (
    <section className="section__container bg-extra-light min-h-screen flex flex-col md:flex-row gap-8 py-8">
      {/* Sidebar */}
      <aside className="dashboard__sidebar bg-primary-light rounded-xl p-6 w-full md:w-64 flex-shrink-0 mb-6 md:mb-0">
        <h2 className="section__header text-left mb-6">Dashboard</h2>
        <nav>
          <ul className="nav__links flex flex-col gap-4">
            <li className="link">
              <a
                href="/dashboard/profile"
                className="hover:text-primary transition"
              >
                Profile
              </a>
            </li>
            <li className="link">
              <a
                href="/dashboard/orders"
                className="hover:text-primary transition"
              >
                Orders
              </a>
            </li>
            <li className="link">
              <a
                href="/dashboard/payments"
                className="hover:text-primary transition"
              >
                Payments
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white rounded-xl p-8 shadow-md">
        <h1 className="section__header mb-8">Welcome Back, Admin!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`categories__card bg-primary-light rounded-lg p-6 text-center shadow-sm transform transition-all duration-700
                ${visible[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              `}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <h4 className="font-header text-lg font-semibold text-text-dark mb-2">
                {stat.label}
              </h4>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default AdminDashboard;