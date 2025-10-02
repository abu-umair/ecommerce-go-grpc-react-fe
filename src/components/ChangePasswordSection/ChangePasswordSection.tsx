import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";

interface ChangePasswordFormValues {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
}

function ChangePasswordSection() {
    const form = useForm<ChangePasswordFormValues>();

    const submitHandler = (values: ChangePasswordFormValues) => {
        console.log(values);
    }

    return (
        <div className="p-4 p-lg-5 border bg-white">
            <h2 className="h3 mb-3 text-black">Ubah Kata Sandi</h2>
            <form onSubmit={form.handleSubmit(submitHandler)}>
                <FormInput<ChangePasswordFormValues>
                    errors={form.formState.errors}
                    name="current_password"
                    register={form.register}
                    type="password"
                    label="Kata Sandi Saat Ini"
                />

                <FormInput<ChangePasswordFormValues>
                    errors={form.formState.errors}
                    name="new_password"
                    register={form.register}
                    type="password"
                    label="Kata Sandi Baru"
                />

                <FormInput<ChangePasswordFormValues>
                    errors={form.formState.errors}
                    name="confirm_new_password"
                    register={form.register}
                    type="password"
                    label="Konfirmasi Kata Sandi Baru"
                />

                {/* <div className="form-group">
                    <label className="text-black" htmlFor="current_password">Kata Sandi Saat Ini</label>
                    <input type="password" className="form-control" id="current_password" />
                </div>
                <div className="form-group">
                    <label className="text-black" htmlFor="new_password">Kata Sandi Baru</label>
                    <input type="password" className="form-control" id="new_password" />
                </div>
                <div className="form-group mb-3">
                    <label className="text-black" htmlFor="confirm_password">Konfirmasi Kata Sandi Baru</label>
                    <input type="password" className="form-control" id="confirm_password" />
                </div> */}
                <button type="submit" className="btn btn-primary">Perbarui Kata Sandi</button>
            </form>
        </div>
    )
}

export default ChangePasswordSection;
