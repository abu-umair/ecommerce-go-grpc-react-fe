import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../components/FormInput/FormInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAuthClient } from '../../api/grpc/client';
import Swal from 'sweetalert2';
import { useState } from 'react';
import useGrpcApi from '../../hooks/useGrpcApi';

const registerSchema = yup.object().shape({
    full_name: yup.string().required('Nama lengkap wajib diisi'),
    email: yup.string().email('Alamat email tidak valid').required('Alamat email wajib diisi'),
    password: yup.string().required('Kata sandi wajib diisi').min(6, 'Kata sandi minimal 6 karakter'),
    password_confirmation: yup.string().required('Konfirmasi kata sandi wajib diisi').oneOf([yup.ref('password')], 'Konfirmasi kata sandi tidak cocok'),
})

interface RegisterFormValues {
    full_name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
const Register = () => {
    const registerApi = useGrpcApi();
    const navigate = useNavigate();
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const form = useForm<RegisterFormValues>({
        resolver: yupResolver(registerSchema),
    });

    const submitHandler = async (values: RegisterFormValues) => {
        try {

            console.log(values);
            setSubmitLoading(false)

            const res = await getAuthClient().register({ //?memanggil API
                email: values.email,
                fullName: values.full_name,
                password: values.password,
                passwordConfirmation: values.password_confirmation,
            });

            console.log(res);//? melihat error untuk di cek dan divalidasi error spesifik


            if (res.response.base?.isError ?? true) {
                if (res.response.base?.message === "User already exist") {
                    Swal.fire({
                        title: 'Register gagal',
                        text: "Email sudah terdaftar",
                        icon: 'error',
                    })
                    return

                }

                Swal.fire({
                    title: 'Terjadi kesalahan',
                    text: 'Mohon coba beberapa saat lagi',
                    icon: 'error',
                })
                return
            }

            Swal.fire({
                title: 'Registrasi Berhasil',
                text: 'Silakan masuk menggunakan akun baru anda',
                icon: 'success',
            })

            navigate('/login')
        } finally {
            setSubmitLoading(false)
        }

    }

    return (
        <div className="login-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="login-wrap p-4">
                            <h2 className="section-title text-center mb-5">Daftar</h2>
                            <form onSubmit={form.handleSubmit(submitHandler)} action="#" className="login-form">
                                <FormInput<RegisterFormValues>
                                    errors={form.formState.errors}
                                    name='full_name'
                                    register={form.register}
                                    type='text'
                                    placeholder='Nama Lengkap'
                                    disabled={submitLoading}
                                />
                                <FormInput<RegisterFormValues>
                                    errors={form.formState.errors}
                                    name='email'
                                    register={form.register}
                                    type='text'
                                    placeholder='Alamat email'
                                    disabled={submitLoading}

                                />
                                <FormInput<RegisterFormValues>
                                    errors={form.formState.errors}
                                    name='password'
                                    register={form.register}
                                    type='password'
                                    placeholder='kata sandi'
                                    disabled={submitLoading}

                                />
                                <FormInput<RegisterFormValues>
                                    errors={form.formState.errors}
                                    name='password_confirmation'
                                    register={form.register}
                                    type='password'
                                    placeholder='konfirmasi kata sandi'
                                    disabled={submitLoading}

                                />

                                {/* <div className="form-group mb-4">
                                    <input type="text" className="form-control" placeholder="Nama Lengkap" required />
                                </div>
                                <div className="form-group mb-4">
                                    <input type="email" className="form-control" placeholder="Alamat Email" required />
                                </div>
                                <div className="form-group mb-4">
                                    <input type="password" className="form-control" placeholder="Kata Sandi" required />
                                </div>
                                <div className="form-group mb-4">
                                    <input type="password" className="form-control" placeholder="Konfirmasi Kata Sandi" required />
                                </div> */}
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={submitLoading}>Buat Akun</button>
                                </div>
                                <div className="text-center mt-4">
                                    <p>Sudah punya akun? <Link to="/login" className="text-primary">Masuk di sini</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
