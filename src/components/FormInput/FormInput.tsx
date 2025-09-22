import React from 'react'

interface FormInputProps {
    type: "text" | "password" //? type nya bisa text atau password
    placeholder?: string //?tidak wajib, (bisa dibuat optional)
}
const FormInput = (props: FormInputProps) => {
    return (
        <div className="form-group mb-4">
            <input type={props.type} className={`form-control ${form.formState.errors.email ? 'is-invalid' : ''}`} placeholder={props.placeholder} {...form.register('email')} />
            <div className={`text-danger ${form.formState.errors.email ? '' : 'hidden'}`} style={{ height: 8 }}>{form.formState.errors.email?.message ?? ''}</div>
        </div>
    )
}

export default FormInput