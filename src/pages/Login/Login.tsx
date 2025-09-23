import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from '../../components/FormInput/FormInput';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { AuthServiceClient } from './../../../pb/auth/auth.client';
import { RpcError } from '@protobuf-ts/runtime-rpc';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

interface LoginFormValues {
    email: string;
    password: string;
}
const Login = () => {
    const form = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
    })
    const submitHandler = async (values: LoginFormValues) => {
        try {
            console.log(values);
            //? membuat channel integrasi
            const transport = new GrpcWebFetchTransport({
                baseUrl: 'http://localhost:8080',
            })

            const client = new AuthServiceClient(transport);

            const res = await client.login({
                email: values.email,
                password: values.password
            });

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
                    })
                }
                return
            }

            Swal.fire({
                icon: 'error',
                title: 'Login gagal',
                text: 'Silakan coba beberapa saat lagi',
                confirmButtonText: 'Ok'
            });
        }
    }

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
                                    <p>Belum punya akun? <Link to="/register" className="text-primary">Daftar di sini</Link>
                                    </p>
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