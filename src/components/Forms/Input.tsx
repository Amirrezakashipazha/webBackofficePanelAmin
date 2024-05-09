import React from 'react'

const Input = ({ label, value, onChange, placeholder, type = "text", name, isValid = true, errorMassge, isRequired = false,register }: { label: string, value?: string, onChange: (e: any) => void, placeholder?: string, icon?: React.ReactElement, type?: string, name: string, isValid?: boolean, errorMassge?: | string, isRequired?: boolean,register:any }) => {
    return (
        <>
            <label className="mb-2.5 block text-black dark:text-white">
                {label}{isRequired && <span className="text-meta-1 mx-1">*</span>}
            </label>
            <input
                {...register}
                // name={name}
                // value={value}
                // onChange={onChange}
                title="User name"
                type={type}
                placeholder={placeholder}
                className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 
                text-black outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter 
                dark:bg-form-input dark:text-white dark:focus:border-primary
                ${isValid ? "border-stroke dark:border-form-strokedark " : "border-danger placeholder-danger"}`}
            />
            <p className="text-danger text-sm mt-1">{errorMassge}</p>
        </>
    )
}

export default Input