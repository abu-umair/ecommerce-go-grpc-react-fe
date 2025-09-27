# File: AdminLayout.tsx

```tsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
// Outlet → nested route, Navigate → redirect

import { useAuthStore } from "../store/auth";

function AdminLayout() {
  const { token, role } = useAuthStore();

  // Jika belum login, redirect ke /login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Jika bukan admin, redirect ke /
  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-layout">
      <h1>Admin Dashboard</h1>
      <Outlet />
    </div>
  );
}

export default AdminLayout;


🔹 Analogi Laravel

if (!token) → if (!Auth::check()) redirect('/login')

if (role !== 'admin') → abort(403) / redirect('/')

<Outlet /> → @yield('content') di Blade