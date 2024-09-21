// components/layouts/AdminLayout.js
import React from 'react';
import Link from 'next/link';

const AdminLayout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <Link href="/admin/dashboard">Admin Dashboard</Link>
          <Link href="/admin/users">Manage Users</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>Admin Footer</footer>
    </div>
  );
};

export default AdminLayout;
