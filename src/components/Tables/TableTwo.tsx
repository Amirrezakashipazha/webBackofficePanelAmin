import { Product } from '../../types/product';
import ProductOne from '../../images/product/product-01.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import { Pagination } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import convertNumberFormat from '../../utils/ConvertNum';
import useDebounce from '../../hooks/useDebounce';
import SearchInput from '../SearchInput';
import DropDownFilter from '../Dropdowns/DropDownFilter';


const TableTwo = () => {
  const { t, i18n } = useTranslation();

  const [selectedOption, setSelectedOption] = useState<number>(5);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const HandleChangeSelect = (e) => {
    setSelectedOption(e.target.value);
    changeTextColor();


    // setState((prevState) => ({
    //   ...prevState,
    //   status: e.target.value,
    // }));
  }


  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    const translatedSearch = translateStatus(search, i18n.language);
    get(`${import.meta.env.VITE_API_URL}products?limit=${selectedOption}&page=${page}&filter=${selectedItem.toLowerCase()}&value=${translatedSearch}`);
    setCurrentPage(page);
    console.log(response);
  }


  const [deleted, setDeleted] = useState(false);


  const { get, response, error, loading } = useAxios();
  const { del, response: responseDelete, error: errorDelete, loading: loadingDelete } = useAxios();





  const HandleDelteUser = async (id: number) => {
    Swal.fire({
      title: t('Are you sure?'),
      text: t("You won't be able to revert this!"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Yes, delete it!'),
      cancelButtonText: t("Cancel")

    }).then((result) => {
      if (result.isConfirmed) {
        del(`${import.meta.env.VITE_API_URL}products/${id}`).then(() => {
          setDeleted(!deleted);
          Swal.fire(
            t('Deleted!'),
            t('Your file has been deleted.'),
            'success'
          )
        }).catch((error) => {
          console.error("Error deleting user:", error);
          Swal.fire(
            t('Failed!'),
            t('There was an error deleting the user.'),
            'error'
          )
        });
      }
    });
  };



  const [selectedItem, setSelectedItem] = useState("Name")



  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 700);

  const statusTranslationMap: { [key: string]: string } = {
    "فعال": "active",
    "غیر فعال": "inactive",
    "غیرفعال": "inactive"
  };
  const translateStatus = (status: string, language: string) => {
    if (language === "fa") {
      return statusTranslationMap[status] || status;
    }
    return status;
  };



  useEffect(() => {
    const translatedSearch = translateStatus(search, i18n.language);
    get(`${import.meta.env.VITE_API_URL}products?limit=${selectedOption}&filter=${selectedItem.toLowerCase()}&value=${translatedSearch}`);
    // console.log(response);
  }, [deleted, selectedOption, debouncedSearch, i18n.language, search, selectedItem]);


  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex flex-col md:flex-row items-center justify-between">
        <Link
          to="/products/create"
          className="mb-5 md:mb-0 inline-flex items-center justify-center rounded-full bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
        >
          {t('Create')}
        </Link>

        <div className="w-full  md:w-125 flex items-center justify-between relative border border-stroke dark:border-strokedark">
          <SearchInput search={search} setSearch={setSearch} />
          <DropDownFilter items={["Id", "Name", "Category", "Discount", "TotalPrice", "Number", "Status"]}
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
                  {t("Name")}
                </th>
                <th className={`${i18n.language === "fa" && "text-start"} min-w-[140px] py-4 px-4 font-medium text-black dark:text-white`}>
                  {t("Category")}
                </th>
                {/* <th className={`${i18n.language === "fa" && "text-start"} min-w-[140px] py-4 px-4 font-medium text-black dark:text-white`}>
                  {t("Sold")}
                </th> */}
                <th className={`${i18n.language === "fa" && "text-start"} min-w-[140px] py-4 px-4 font-medium text-black dark:text-white`}>
                  {t("Discount")}
                </th>
                <th className={`${i18n.language === "fa" && "text-start"} min-w-[140px] py-4 px-4 font-medium text-black dark:text-white`}>
                  {t("Total Price")}
                </th>
                <th className={`${i18n.language === "fa" && "text-start"} min-w-[140px] py-4 px-4 font-medium text-black dark:text-white`}>
                  {t("Number")}
                </th>
                <th className={`${i18n.language === "fa" && "text-start"} min-w-[140px] py-4 px-4 font-medium text-black dark:text-white`}>
                  {t("Status")}
                </th>
                <th className={`${i18n.language === "fa" && "text-start"} min-w-[120px] py-4 px-4 font-medium text-black dark:text-white`}>
                  {t("Actions")}
                </th>
              </tr>
            </thead>
            <tbody>


              {response && response.data.map((product, key) => (
                <tr key={key} className='border-b border-[#eee] dark:border-strokedark'>
                  <td className={`py-5 px-4 ${i18n.language === "fa" ? "pr-9" : "pl-9"} xl:pl-11`}>
                    <p className="text-black dark:text-white">
                      {convertNumberFormat(product.id, i18n.language)}

                    </p>
                  </td>
                  <td className="py-5 px-4 flex items-center">
                    <div className={`flex-shrink-0 w-[68px] h-[48px] ${i18n.language === "fa" ? "ml-3" : "mr-3"}`}>
                      <img src={JSON.parse(product.image)[0]} alt="Brand" className='w-full h-full rounded-md object-cover' />
                    </div>
                    <h5 className="font-medium text-black dark:text-white">
                      {product.name}
                    </h5>
                    {/* <p className="text-sm">${packageItem.price}</p> */}
                  </td>
                  <td className="py-5 px-4">
                    <p className="text-black dark:text-white">
                      {product.category}
                    </p>
                  </td>
                  {/* <td className="py-5 px-4">
                    <p className="text-black dark:text-white">
                      {product.sold}
                    </p>
                  </td> */}
                  <td className="py-5 px-4">
                    <p className="text-black dark:text-white">
                      %{convertNumberFormat(product.discount, i18n.language)}
                    </p>
                  </td>
                  <td className="py-5 px-4">
                    <p className="text-success">
                      ${convertNumberFormat(product.total_price, i18n.language)}

                    </p>
                  </td>
                  <td className="py-5 px-4">
                    <p className={product.number === 0 ? "text-danger" : "text-black dark:text-white"}>
                      {
                        product.number === 0 ? t("unavailable") :
                          convertNumberFormat(product.number, i18n.language)

                      }

                    </p>
                  </td>
                  <td className="py-5 px-4">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${product.status === 'active'
                        ? 'bg-success text-success'
                        : product.status === 'inactive'
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                        }`}
                    >
                      {t(product.status)}
                    </p>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex items-center">
                      <Link to={`/products/edit/${product.id}`} className='h-[18px]'>
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

                      </Link>

                      <button title='delete' className="mx-[14px] hover:text-primary" onClick={() => HandleDelteUser(product.id)}>
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </button>

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
  );
};

export default TableTwo;
