import React from 'react'
import { UseFormRegister } from 'react-hook-form'

// eslint-disable-next-line
interface FormInputProps<T extends Record<string, any>> { //?perlu di extend hingga menjadi Record 
    type: "text" | "password" //? type nya bisa text atau password
    placeholder?: string //?tidak wajib, (bisa dibuat optional)
    register: UseFormRegister<T>; //?membuat generik 
}

// eslint-disable-next-line
function FormInput<T extends Record<string, any>>(props: FormInputProps<T>) {
    return (
        <div className="form-group mb-4">
            <input type={props.type} className={`form-control ${form.formState.errors.email ? 'is-invalid' : ''}`} placeholder={props.placeholder} {...form.register('email')} />
            <div className={`text-danger ${form.formState.errors.email ? '' : 'hidden'}`} style={{ height: 8 }}>{form.formState.errors.email?.message ?? ''}</div>
        </div>
    )
}

export default FormInput