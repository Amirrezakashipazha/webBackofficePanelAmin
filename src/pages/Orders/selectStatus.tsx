import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useTranslation } from 'react-i18next';

const SelectStatus = ({ status, id ,table,onStatusChangeSuccess }) => {
    // Set an initial state value for `selectedOptionStatus`

    const { t } = useTranslation();
    const { patch, response, error, loading } = useAxios();

    const [selectedOptionStatus, setSelectedOptionStatus] = useState('in progress'); // Default to 'in progress'

    const HandleChangeSelectStatus = async (e) => {
        setSelectedOptionStatus(e.target.value);
        try {
            await patch(`${import.meta.env.VITE_API_URL}${table}/${id}`, { status: e.target.value });
            if (onStatusChangeSuccess) {
                onStatusChangeSuccess();
            }
        } catch (err) {
            console.error('Error updating user:', err);
        }
    };
    useEffect(() => {
        setSelectedOptionStatus(status)
    }, [status])

    return (
        <select
            title="Select status"
            value={selectedOptionStatus}
            onChange={HandleChangeSelectStatus}
            className={`relative  z-20 appearance-none rounded border border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                ${selectedOptionStatus === 'in progress' ? 'text-warning' : selectedOptionStatus === 'delivered' ? 'text-success' : 'text-danger'}`
            }
        >
            <option value="in progress" className="text-warning">
                {t("in progress")}
            </option>
            <option value="delivered" className="text-success">
                {t("delivered")}
            </option>
            <option value="canceled" className="text-danger">
                {t("canceled")}
            </option>
        </select>
    );
};

export default SelectStatus;
