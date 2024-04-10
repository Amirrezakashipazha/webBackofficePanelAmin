import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';

const SelectStatus = ({ status, id ,table,onStatusChangeSuccess }) => {
    // Set an initial state value for `selectedOptionStatus`

    const { patch, response, error, loading } = useAxios();

    const [selectedOptionStatus, setSelectedOptionStatus] = useState('in progress'); // Default to 'in progress'

    const HandleChangeSelectStatus = async (e) => {
        setSelectedOptionStatus(e.target.value);
        try {
            await patch(`http://localhost:3000/api/${table}/${id}`, { status: e.target.value });
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
            className={`relative w-[115px] z-20 appearance-none rounded border border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                ${selectedOptionStatus === 'in progress' ? 'text-warning' : selectedOptionStatus === 'delivered' ? 'text-success' : 'text-danger'}`
            }
        >
            <option value="in progress" className="text-warning">
                in progress
            </option>
            <option value="delivered" className="text-success">
                delivered
            </option>
            <option value="canceled" className="text-danger">
                canceled
            </option>
        </select>
    );
};

export default SelectStatus;
