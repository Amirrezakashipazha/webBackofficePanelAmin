import { useTranslation } from "react-i18next";

const SelectStatus = ({ label, value, onChange, isOptionSelected }: { label: string, value: string, onChange: (e: any) => void, isOptionSelected: boolean }) => {
    const { t } = useTranslation();
    return (
        <>
            <label className="mb-2.5 block text-black dark:text-white">
                {label}
            </label>

            <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                    name="status"
                    title="select status"
                    value={value}
                    onChange={onChange}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
                        }`}
                >

                    <option value="active" className="text-body dark:text-bodydark">
                        {t('active')}
                    </option>
                    <option value="inactive" className="text-body dark:text-bodydark">
                        {t('inactive')}
                    </option>

                </select>
            </div>
        </>
    )
}

export default SelectStatus