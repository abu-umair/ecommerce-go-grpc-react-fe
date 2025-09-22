import React from 'react'

interface FormInputProps {
    
}
const FormInput = (props: FormInputProps) => {
    return (
        <div className="form-group mb-4">
            <input type="text" className={`form-control ${form.formState.errors.email ? 'is-invalid' : ''}`} placeholder="Alamat Email" {...form.register('email')} />
            <div className={`text-danger ${form.formState.errors.email ? '' : 'hidden'}`} style={{ height: 8 }}>{form.formState.errors.email?.message ?? ''}</div>
        </div>
    )
}

export default FormInput