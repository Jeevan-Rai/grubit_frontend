// components/layouts/GuestLayout.js
import React from 'react';
import Link from 'next/link';

const GuestLayout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>Guest Footer</footer>
    </div>
  );
};

export default GuestLayout;
