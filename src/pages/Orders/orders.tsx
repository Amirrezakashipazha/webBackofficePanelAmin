import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import { Pagination } from 'flowbite-react';
import SelectStatus from './selectStatus';
import { useTranslation } from 'react-i18next';
import convertNumberFormat from '../../utils/ConvertNum';
import useDebounce from '../../hooks/useDebounce';
import SearchInput from '../../components/SearchInput';
import DropDownFilter from '../../components/Dropdowns/DropDownFilter';


const Orders = () => {

    const { t, i18n } = useTranslation();

    const [refreshData, setRefreshData] = useState(false);

    const [selectedOption, setSelectedOption] = useState<number>(5);
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    const HandleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(parseInt(e.target.value));
        changeTextColor();
    }

    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page: number) => {
        const translatedSearch = translateStatus(search, i18n.language);
        get(`${import.meta.env.VITE_API_URL}order?limit=${selectedOption}&page=${page}&filter=${selectedItem.toLowerCase()}&value=${translatedSearch}`);
        setCurrentPage(page);
        console.log(response);
    }


    const [deleted, setDeleted] = useState(false);


    const { get, response, error, loading } = useAxios();
    const { del, response: responseDelete, error: errorDelete, loading: loadingDelete } = useAxios();

    useEffect(() => {
        get(`${import.meta.env.VITE_API_URL}order?limit=2000&page=1`);
    }, [responseDelete]);




    const handleStatusChangeSuccess = () => {
        setRefreshData(prev => !prev);
        if (currentPage > 1 && response?.data?.length <= 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    const [selectedItem, setSelectedItem] = useState("ProductName")



    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 700);

    const statusTranslationMap: { [key: string]: string } = {
        "کنسل شده": "canceled",
        "درحال ارسال": "in progress",
        "در حال ارسال": "in progress"
    };
    const translateStatus = (status: string, language: string) => {
        if (language === "fa") {
            return statusTranslationMap[status] || status;
        }
        return status;
    };


    useEffect(() => {
        const translatedSearch = translateStatus(search, i18n.language);
        const fetchData = async () => {
            await get(`${import.meta.env.VITE_API_URL}order?limit=${selectedOption}&page=${currentPage}&filter=${selectedItem.toLowerCase()}&value=${translatedSearch}`);
            if (response && response.data.length === 0 && currentPage > 1) {
                setCurrentPage(1); 
            }
        };

        fetchData();
    }, [refreshData, selectedOption, currentPage, debouncedSearch, i18n.language, search, selectedItem]);


    if (error) return <p>Error: {error}</p>;
    return (
        <DefaultLayout>
            <Breadcrumb pageName={t('Orders')} />

            <div className="flex flex-col gap-10">

                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                    <div className="py-6 px-4 md:px-6 xl:px-7.5">
                      
                        <div className="w-full  md:w-125 flex items-center justify-between relative border border-stroke dark:border-strokedark">
                            <SearchInput search={search} setSearch={setSearch} />
                            <DropDownFilter items={["Id", "ProductName", "Price", "Username", "Date", "Status"]}
                                selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                        </div>
                    </div>
                    <div className="max-w-full">

                        <div className="overflow-x-auto">

                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className={`${i18n.language === "fa" ? "text-start pl-4 pr-9" : "pr-4 pl-9"} min-w-[70px] py-4 font-medium text-black dark:text-white xl:pl-11`}>
                                            {t("Id")}
                                        </th>
                                        <th className={`${i18n.language === "fa" && "text-start"} min-w-[140px] py-4 px-4 font-medium text-black dark:text-white`}>
                                            {t("Product Name")}
                                        </th>
                                        <th className={`${i18n.language === "fa" && "text-start"} min-w-[150px] py-4 px-4 font-medium text-black dark:text-white`}>
                                            {t("Price")}
                                        </th>
                                        <th className={`${i18n.language === "fa" && "text-start"} min-w-[150px] py-4 px-4 font-medium text-black dark:text-white`}>
                                            {t("Username")}
                                        </th>
                                        <th className={`${i18n.language === "fa" && "text-start"} min-w-[150px] py-4 px-4 font-medium text-black dark:text-white`}>
                                            {t("Date")}
                                        </th>
                                        <th className={`${i18n.language === "fa" && "text-start"} min-w-[150px] py-4 px-4 font-medium text-black dark:text-white`}>
                                            {t("Status")}
                                        </th>
                                        <th className={`${i18n.language === "fa" && "text-start"} min-w-[100px] py-4 px-4 font-medium text-black dark:text-white`}>
                                            {t("Actions")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>


                                    {response && response.data.map((item, key) => (
                                        <tr key={key} className='border-b border-[#eee] dark:border-strokedark'>
                                            <td className={`py-5 px-4 ${i18n.language === "fa" ? "pr-9" : "pl-9"} xl:pl-11`}>
                                                <p className="text-black dark:text-white">
                                                    {convertNumberFormat(item.id, i18n.language)}
                                                </p>
                                            </td>
                                            <td className="">
                                                <Link to={`/products/edit/${item.product.id}`} className="flex items-center py-5 px-4">
                                                    <div className={`flex-shrink-0 w-[58px] h-[58px] ${i18n.language === "fa" ? "ml-3" : "mr-3"}`}>
                                                        <img src={JSON.parse(item.product.image)[0]} alt="Brand" className='w-full h-full rounded-md object-cover' />
                                                    </div>
                                                    <h5 className="font-medium text-black dark:text-white">
                                                        {item.product.name}
                                                    </h5>
                                                </Link>
                                            </td>
                                            <td className="py-5 px-4">
                                                <p className="text-black dark:text-white">
                                                    ${convertNumberFormat(item.product.total_price, i18n.language)}
                                                </p>
                                            </td>
                                            <td className=" ">

                                                <Link to={`/users/edit/${item.user.id}`} className="flex items-center py-5 px-4 pl-4 ">
                                                    <div className={`flex-shrink-0 w-[48px] h-[48px] ${i18n.language === "fa" ? "ml-3" : "mr-3"}`}>
                                                        <img src={item.user.avatar} alt="Brand" className='w-full h-full rounded-full object-cover' />
                                                    </div>
                                                    <h5 className="font-medium text-black dark:text-white">
                                                        {item.user.name}
                                                    </h5>
                                                </Link>
                                            </td>
                                            <td className="py-5 px-4">
                                                <p className="text-black dark:text-white">
                                                    {item.created_at.split("T")[0]}
                                                </p>
                                            </td>
                                            <td className="py-5 px-4">
                                                <SelectStatus status={item.status} id={item.id} table={"order"} onStatusChangeSuccess={handleStatusChangeSuccess} />

                                            </td>
                                            <td className="py-5 px-4">
                                                <div className="flex items-center space-x-3.5">
                                                    {

                                                        <Link to={`/orders/view/${item.id}`} className='h-[18px] pl-4'>
                                                            <button title='product' className="hover:text-primary">
                                                                <svg
                                                                    className="fill-current"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 18 18"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                                        fill=""
                                                                    />
                                                                    <path
                                                                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                                        fill=""
                                                                    />
                                                                </svg>
                                                            </button>

                                                        </Link>}



                                                </div>
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                        {response?.data?.length === 0 && (

                            <p className="text-title-md2 font-semibold text-black dark:text-white my-20 mx-auto w-fit">{t("No Data !")}</p>

                        )}
                        <div className="flex flex-col md:flex-row justify-between items-center m-3">
                            <div className="flex overflow-x-auto sm:justify-start flowbite mb-5 md:mb-0 overflow-auto max-w-full">
                                {response?.data?.length == 0 || response?.pageCount != 1 && <Pagination currentPage={currentPage} totalPages={response?.pageCount || 0} onPageChange={onPageChange} showIcons
                                    previousLabel=""
                                    nextLabel="" />}
                            </div>
                            {!response?.data?.length == 0 && <div className="relative z-20 bg-transparent dark:bg-form-input">
                                <select
                                    value={selectedOption}
                                    onChange={HandleChangeSelect}
                                    className={`relative w-[90px] z-20 appearance-none rounded border border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
                                        }`}
                                >

                                    <option value="5" className="text-body dark:text-bodydark">
                                        {convertNumberFormat(5, i18n.language)}
                                    </option>
                                    <option value="10" className="text-body dark:text-bodydark">
                                        {convertNumberFormat(10, i18n.language)}
                                    </option>

                                    <option value="20" className="text-body dark:text-bodydark">
                                        {convertNumberFormat(20, i18n.language)}
                                    </option>

                                    <option value="50" className="text-body dark:text-bodydark">
                                        {convertNumberFormat(50, i18n.language)}
                                    </option>
                                    <option value="100" className="text-body dark:text-bodydark">
                                        {convertNumberFormat(100, i18n.language)}
                                    </option>
                                </select>


                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Orders