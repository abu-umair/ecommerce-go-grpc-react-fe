import React from 'react'
import { FieldErrors, Path, UseFormRegister } from 'react-hook-form'

// eslint-disable-next-line
interface FormInputProps<T extends Record<string, any>> { //?perlu di extend hingga menjadi Record 
    type: "text" | "password" | "image" //? type nya bisa text atau password, atau image
    placeholder?: string //?tidak wajib, (bisa dibuat optional)
    register: UseFormRegister<T>; //?membuat generik 
    name: Path<T>;
    errors: FieldErrors<T>;
    disabled?: boolean;
    label?: string;
    labelRequired?: boolean;
}


// eslint-disable-next-line
function FormInput<T extends Record<string, any>>(props: FormInputProps<T>) {
    const renderInput = () => {
        if (props.type === 'image') {
            <input
                type="file"
                accept='image/*'
                multiple={false}
                className={`form-control ${props.errors[props.name] ? 'is-invalid' : ''}`} id={props.name} placeholder={props.placeholder} disabled={props.disabled} {...props.register(props.name)}
            />
        }
        //?input default 
        return (
            <input type={props.type} className={`form-control ${props.errors[props.name] ? 'is-invalid' : ''}`} id={props.name} placeholder={props.placeholder} disabled={props.disabled} {...props.register(props.name)} />

        )
    }

    return (
        <div className="form-group mb-4">
            {props.label &&
                <label className="text-black" htmlFor="props.name">{props.label} {props.labelRequired && <span className="text-danger">*</span>}</label>
            }
            {renderInput()}
            <div className={`text-danger ${props.errors[props.name] ? '' : 'hidden'}`} style={{ height: 8 }}>
                {props.errors[props.name]?.message as string | null ?? ''}
            </div>
        </div>
    )
}

export default FormInput