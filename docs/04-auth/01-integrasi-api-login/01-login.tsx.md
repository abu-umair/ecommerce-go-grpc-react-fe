# Penjelasan Baris per Baris: login.tsx

```tsx
import { Link, useNavigate } from 'react-router-dom';
// Import router untuk navigasi antar halaman

import { useForm } from 'react-hook-form';
// Gunakan react-hook-form untuk handle form dengan lebih rapi

import * as Yup from 'yup';
// Yup digunakan untuk validasi form

import Swal from 'sweetalert2';
// SweetAlert untuk menampilkan alert success/error

import { yupResolver } from "@hookform/resolvers/yup";
// Menghubungkan Yup dengan react-hook-form

import FormInput from '../../components/FormInput/FormInput';
// Komponen custom input form (agar tidak ulang-ulang kode)

import { RpcError } from '@protobuf-ts/runtime-rpc';
// Error bawaan gRPC jika request gagal

import { getAuthClient } from '../../api/grpc/client';
// Fungsi untuk membuat client AuthService (koneksi ke server gRPC)


// 🔹 Definisikan schema validasi dengan Yup
const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// 🔹 Tipe data untuk form login
interface LoginFormValues {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate(); 
    // Untuk redirect setelah login berhasil

    const form = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
        // Menghubungkan form dengan validasi Yup
    });

    // 🔹 Handler ketika user submit form
    const submitHandler = async (values: LoginFormValues) => {
        try {
            console.log(values);

            const client = getAuthClient(); 
            // Panggil client gRPC dari client.ts

            const res = await client.login({
                email: values.email,
                password: values.password
            });
            // Kirim request login ke server gRPC

            if (res.response.base?.isError ?? true) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login gagal',
                    text: 'Silakan coba beberapa saat lagi',
                    confirmButtonText: 'Ok'
                });
            }

            console.log(res.response.accessToken);

            localStorage.setItem('access_token', res.response.accessToken);
            // Simpan token ke localStorage

            navigate('/');
            // Redirect ke homepage

            Swal.fire({
                icon: 'success',
                title: 'Login successfully',
                confirmButtonText: 'Ok'
            });
        } catch (e) {
            if (e instanceof RpcError) {
                console.log(e.code);
                if (e.code === 'UNAUTHENTICATED' || e.code === 'INTERNAL') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login gagal',
                        text: 'Email atau password salah',
                        confirmButtonText: 'Ok'
                    });
                }
                return;
            }

            Swal.fire({
                icon: 'error',
                title: 'Login gagal',
                text: 'Silakan coba beberapa saat lagi',
                confirmButtonText: 'Ok'
            });
        }
    };

    // 🔹 UI Form Login
    return (
        <div className="login-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="login-wrap p-4">
                            <h2 className="section-title text-center mb-5">Masuk</h2>
                            <form onSubmit={form.handleSubmit(submitHandler)} action="#" className="login-form">
                                <FormInput<LoginFormValues>
                                    errors={form.formState.errors}
                                    name="email"
                                    register={form.register}
                                    type="text"
                                    placeholder="Alamat email"
                                />
                                <FormInput<LoginFormValues>
                                    errors={form.formState.errors}
                                    name="password"
                                    register={form.register}
                                    type="password"
                                    placeholder="Kata sandi"
                                />

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">Masuk</button>
                                </div>
                                <div className="text-center mt-4">
                                    <p>Belum punya akun? <Link to="/register" className="text-primary">Daftar di sini</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
