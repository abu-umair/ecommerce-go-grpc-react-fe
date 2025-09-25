# Flow Integrasi API Login (React + TypeScript + Go gRPC)

## Alur Login

1. **User isi form login di React (login.tsx)**
   - Input email & password → divalidasi dengan Yup.
   - Form dikontrol dengan `react-hook-form`.

2. **Submit form → panggil fungsi `submitHandler`**
   - Buat request login ke API gRPC.
   - Client gRPC diambil dari `getAuthClient()` (file client.ts).

3. **`client.login()` dipanggil**
   - Mengirim request ke server gRPC (Go).
   - Menggunakan transport `GrpcWebFetchTransport`.

4. **Server gRPC (Go) → AuthService**
   - Menerima request login (email & password).
   - Validasi ke database.
   - Jika benar → kembalikan `accessToken`.
   - Jika salah → kembalikan error `UNAUTHENTICATED`.

5. **Response diterima di React**
   - Jika sukses → simpan `accessToken` ke `localStorage`.
   - Jika gagal → tampilkan error dengan SweetAlert.

---

## Analogi Laravel

- `login.tsx` → sama seperti **Controller** + **Blade form** (gabungan, karena React handle UI & logic).
- `client.ts` → sama seperti **Service Class** di Laravel yang khusus handle API call.
- `AuthService` (Go gRPC) → sama seperti **Controller + Service di Laravel** yang menerima request & balikan response JSON.
- `accessToken` → sama seperti token dari **Laravel Sanctum atau Passport**.
