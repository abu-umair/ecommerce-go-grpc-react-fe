# File: AuthLayout.tsx

```tsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

function AuthLayout() {
  const { token } = useAuthStore();

  // Jika sudah login, redirect ke home
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
}

export default AuthLayout;


🔹 Analogi Laravel

if (token) → if (Auth::check()) redirect('/')

<Outlet /> → @yield('content') di layout Blade

AuthLayout → Middleware guest