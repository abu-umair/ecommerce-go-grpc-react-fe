import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from '../../components/FormInput/FormInput';

interface RegisterFormValues {
    full_name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
const Register = () => {
    const form = useForm<RegisterFormValues>();

    const submitHandler = (values: RegisterFormValues) => {
        console.log(values);

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
                                />
                                <FormInput<RegisterFormValues>
                                    errors={form.formState.errors}
                                    name='email'
                                    register={form.register}
                                    type='text'
                                    placeholder='Alamat email'
                                />
                                <FormInput<RegisterFormValues>
                                    errors={form.formState.errors}
                                    name='password'
                                    register={form.register}
                                    type='password'
                                    placeholder='kata sandi'
                                />
                                <FormInput<RegisterFormValues>
                                    errors={form.formState.errors}
                                    name='password_confirmation'
                                    register={form.register}
                                    type='password'
                                    placeholder='konfirmasi kata sandi'
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
                                    <button type="submit" className="btn btn-primary btn-block">Buat Akun</button>
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
