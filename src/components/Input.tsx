
const Input = ({ label, value, onChange, placeholder, icon, type = "text", name, notValid = false ,errorMassge}: { label: string, value?: string, onChange: (e: any) => void, placeholder?: string, icon?: React.ReactElement, type?: string, name: string, notValid?: boolean ,errorMassge?:|string}) => {
    return (
        <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
                {label}
            </label>
            <div className="relative transition-all">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 text-black outline-none dark:bg-form-input dark:text-white 
                    ${notValid ? "border-danger placeholder-danger focus:border-5 focus:border-danger dark:focus:border-danger" : "border-stroke dark:border-form-strokedark dark:focus:border-primary focus:border-primary focus-visible:shadow-none"}`}
                />

                <span className={`absolute right-4 top-4 ${notValid && "text-danger"} `}>
                    {icon}
                </span>
            </div>
            <p className="text-danger text-sm mt-1">{errorMassge}</p>

        </div>

    )
}

export default Input