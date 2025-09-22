import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from '../../components/FormInput/FormInput';

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
    const submitHandler = (values: LoginFormValues) => {
        console.log(values);
        Swal.fire({
            icon: 'success',
            title: 'Login successfully',
            confirmButtonText: 'Ok'
        });
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
                                <div className="form-group mb-4">
                                    <input type="password" className={`form-control ${form.formState.errors.password ? 'is-invalid' : ''}`} placeholder="Kata sandi" {...form.register('password')} />
                                    <div className={`text-danger ${form.formState.errors.password ? '' : 'hidden'}`} style={{ height: 8 }}>{form.formState.errors.password?.message ?? ''}</div>
                                </div>
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