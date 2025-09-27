# Flow Mekanisme Login Frontend

## Alur Utama Login

1. **User mengisi form login (Login.tsx)**  
   - Input email & password divalidasi dengan `react-hook-form` + `Yup`.  
   - Submit form → panggil gRPC `AuthService.Login`.

2. **Response diterima**  
   - Jika sukses → simpan `accessToken` ke `localStorage`.  
   - Decode JWT pakai `jwtDecode` → update store Zustand (`auth.ts`).  
   - Update state: `isLoggedIn = true`, `jwtPayload = data token`, `role = admin/customer`.

3. **Navigasi setelah login**  
   - Jika role = admin → diarahkan ke `/admin/dashboard`.  
   - Jika role = customer → diarahkan ke `/`.

4. **AuthStore (auth.ts)**  
   - Menyimpan state login global (role, payload, isLoggedIn).  
   - Semua komponen (Navbar, AdminLayout, AuthLayout) bisa akses state ini.

5. **Navbar (navbar.tsx)**  
   - Menampilkan tombol cart/profile/logout.  
   - Jika `isLoggedIn = false` → tombol redirect ke `/login`.  
   - Jika `isLoggedIn = true` → tampilkan tombol logout.

6. **Interceptor (auth-interceptor.ts)**  
   - Menyisipkan `Authorization: Bearer <token>` ke setiap request gRPC.

7. **App.tsx (initiate session)**  
   - Saat reload, cek `localStorage.access_token`.  
   - Jika ada → panggil `getProfile` untuk validasi token.  
   - Jika valid → set ulang `AuthStore`.

8. **Proteksi Halaman**  
   - `AdminLayout` → redirect ke `/` jika bukan admin.  
   - `AuthLayout` → redirect ke `/admin/dashboard` kalau sudah login.  

---

## Analogi Laravel

- `auth.ts` → mirip **Auth Middleware** (menyimpan status user).  
- `login.tsx` → mirip **LoginController + Form Request**.  
- `auth-interceptor.ts` → mirip **Laravel Middleware: auth:sanctum/passport**.  
- `App.tsx (fetchProfile)` → mirip **auth guard Laravel (cek session di setiap request)**.  
- `AdminLayout` → mirip **route group middleware: admin**.  
- `AuthLayout` → mirip **redirect user kalau sudah login (guest middleware)**.  
