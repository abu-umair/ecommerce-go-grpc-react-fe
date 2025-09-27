# File: app.tsx

```tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// react-router-dom → mirip Route::get/post di Laravel

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Login & Register */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Layout untuk Admin */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


🔹 Analogi Laravel

BrowserRouter → RouteServiceProvider

<Route path="/login" ...> → Route::get('/login', [AuthController@login])

<AuthLayout> → Middleware guest

<AdminLayout> → Middleware auth + role admin