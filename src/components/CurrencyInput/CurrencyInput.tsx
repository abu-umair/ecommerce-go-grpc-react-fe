//!Folder dan file dicopas dari FormInput (krn hampir mirip), kemudian di ubah namanya
import React from 'react'
import { Control, Controller, FieldErrors, Path } from 'react-hook-form'
import { NumericFormat } from 'react-number-format';//?librarynya sudah ada di package template

// eslint-disable-next-line
interface CurrencyInputProps<T extends Record<string, any>> { //?perlu di extend hingga menjadi Record 
    placeholder?: string //?tidak wajib, (bisa dibuat optional)
    control: Control<T>; //?membuat generik 
    name: Path<T>;
    errors: FieldErrors<T>;
    disabled?: boolean;
    label?: string;
    labelRequired?: boolean;
}


// eslint-disable-next-line
function CurrencyInput<T extends Record<string, any>>(props: CurrencyInputProps<T>) {
    return (
        <div className="form-group mb-4">
            {props.label &&
                <label className="text-black" htmlFor="props.name">{props.label} {props.labelRequired && <span className="text-danger">*</span>}</label>
            }
            <Controller
                name={props.name}
                control={props.control} //?utk mengoper ke ProductForm
                render={({ field: { ref, onChange, ...FieldProps } }) => (
                    <NumericFormat
                        className={`form-control ${props.errors[props.name] ? 'is-invalid' : ''}`}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="Rp "
                        allowNegative={false}//?tidak boleh minus
                        decimalScale={2}//?membuat nilai decimal
                        placeholder={props.placeholder} //?place holder dari input kt
                        {...FieldProps}
                        getInputRef={ref}
                        disabled={props.disabled}
                        onValueChange={(values) => {
                            const numericValue: number = values.floatValue ?? 0;
                            onChange(numericValue);
                        }}
                    />
                )}
            />
            <div className={`text-danger ${props.errors[props.name] ? '' : 'hidden'}`} style={{ height: 8 }}>
                {props.errors[props.name]?.message as string | null ?? ''}
            </div>
        </div>
    )
}

export default CurrencyInput