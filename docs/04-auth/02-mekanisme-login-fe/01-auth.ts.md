# File: auth.ts

```ts
import { jwtDecode } from "jwt-decode";
// Untuk decode JWT (ambil data user dari token)

import { create } from "zustand";
// State management global (pengganti Redux)

import { Timestamp } from "../../pb/google/protobuf/timestamp";
// Tipe Timestamp bawaan protobuf

// 🔹 Struktur data payload dari JWT
interface JwtPayload {
    sub: string;          // ID user
    full_name: string;    // Nama lengkap
    email: string;        // Email user
    role: string;         // Role user (admin/customer)
    member_since: Timestamp; // Tanggal join
}

// 🔹 Struktur Auth Store
interface AuthStoreState {
    isLoggedIn: boolean;               // Status login
    jwtPayload: JwtPayload | null;     // Data JWT user
    role: "customer" | "admin";        // Role user
    login: (token: string) => void;    // Fungsi untuk login
}

// 🔹 Implementasi Zustand store
export const useAuthStore = create<AuthStoreState>((set) => ({
    isLoggedIn: false,
    jwtPayload: null,
    role: "customer",
    login: (token: string) => set(state => {
        try {
            const claims = jwtDecode<JwtPayload>(token);
            // Decode token JWT → ambil payload

            return {
                ...state,
                jwtPayload: claims,
                isLoggedIn: true,
                role: claims.role === "admin" ? "admin" : "customer"
                // Set role berdasarkan isi token
            }
        } catch {
            return { ...state } // Jika gagal decode, tidak ubah state
        }
    })
}));


Analogi Laravel

useAuthStore → mirip Auth::user() di Laravel.

jwtDecode → mirip JWT Guard Laravel.

isLoggedIn → mirip auth()->check().