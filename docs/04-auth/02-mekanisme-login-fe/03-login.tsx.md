# File: login.tsx

```tsx
import React from "react";
import { useForm } from "react-hook-form";
// react-hook-form → handle form state & validasi

import { yupResolver } from "@hookform/resolvers/yup";
// Integrasi Yup ke react-hook-form

import * as Yup from "yup";
// Yup → definisi skema validasi

import { AuthServiceClient } from "../../pb/auth/auth.client";
// gRPC Client untuk AuthService

import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
// Transport gRPC via HTTP/Fetch

import { useNavigate } from "react-router-dom";
// Untuk redirect setelah login

import { useAuthStore } from "../../store/auth";
// Global store untuk auth state

// 🔹 Definisi form type
interface LoginFormValues {
    email: string;
    password: string;
}

// 🔹 Skema validasi form
const loginSchema = Yup.object().shape({
    email: Yup.string().required("Email wajib diisi").email("Email tidak valid"),
    password: Yup.string().required("Password wajib diisi").min(6, "Minimal 6 karakter"),
});

function Login() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    // react-hook-form setup
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
    });

    // Fungsi submit
    const submitHandler = async (values: LoginFormValues) => {
        try {
            const transport = new GrpcWebFetchTransport({
                baseUrl: "http://localhost:8080", // gRPC Gateway URL
            });

            const client = new AuthServiceClient(transport);

            // 🔹 Panggil gRPC login
            const res = await client.login({
                email: values.email,
                password: values.password,
            });

            if (res.response.base?.isError ?? true) {
                alert(res.response.base?.message || "Login gagal");
                return;
            }

            // 🔹 Simpan token ke localStorage
            localStorage.setItem("access_token", res.response.accessToken);

            // 🔹 Update global store
            login(res.response.accessToken);

            // 🔹 Redirect sesuai role
            if (res.response.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan server");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
                {/* Email */}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                {/* Submit */}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;


Analogi Laravel

useForm + Yup → mirip Form Request (RegisterRequest/LoginRequest).

client.login() → mirip AuthController@login.

localStorage.setItem("access_token") → mirip menyimpan token di session.

login() dari Zustand → mirip Auth::attempt() lalu set user ke Auth::user().

navigate() → mirip redirect()->route('dashboard').