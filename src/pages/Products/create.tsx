import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import { useEffect, useRef, useState } from 'react';
import useAxios from "../../hooks/useAxios";
import { useNavigate } from 'react-router-dom';
import SelectImage from "../../components/Forms/selectImage";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import SwitcherThree from "../../components/Switchers/SwitcherThree";
import { useCollapse } from 'react-collapsed'
import CheckboxTwo from "../../components/Checkboxes/CheckboxTwo";
import MultiSelect from "../../components/Forms/MultiSelect";
import { ChromePicker  } from 'react-color';

const CreateProduct = () => {
    const { t, i18n } = useTranslation();
    const { get: getCategory, response: responseCategory, error: errorCategory, loading: loadingCategory } = useAxios();

    useEffect(() => {
        getCategory(`${import.meta.env.VITE_API_URL}category?limit=1000`)
    }, [])


    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const handleFileSelect = (id: string, file: File) => {
        setSelectedFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            const index = images.findIndex((image) => image.id === id);
            newFiles[index] = file;
            return newFiles;
        });
    };
    const navigate = useNavigate();

    const [selectedAvatar, setSelectedAvatar] = useState<string>('');
    const [selectedOptionStatus, setSelectedOptionStatus] = useState<string>('active');
    const [selectedOptionCategory, setSelectedOptionCategory] = useState<string>('active');
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };


    const [state, setState] = useState({
        name: "",
        price: "",
        discount: "",
        totalPrice: "",
        description: ""
    });
    const HandleChangeSelectStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOptionStatus(e.target.value);
        changeTextColor();


        setState((prevState) => ({
            ...prevState,
            status: e.target.value,
        }));
    }
    const HandleChangeSelectCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOptionCategory(e.target.value);
        changeTextColor();


        setState((prevState) => ({
            ...prevState,
            status: e.target.value,
        }));
    }

    const HandleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAvatar(e.target.value);
        // changeTextColor();


        setState((prevState) => ({
            ...prevState,
            avatar: e.target.value,
        }));
    }
    const [Select, setSelect] = useState();
    // const [Select, setSelect] = useState();

    const { post, response, error, loading } = useAxios();

    useEffect(() => {
        console.log(state);
    }, [state]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const numericValue = name === "price" || name === "discount" ? parseFloat(value) : value;
        setState((prevState) => {
            const newState = { ...prevState, [name]: numericValue };
            if (name === "price" || name === "discount") {
                const price = name === "price" ? numericValue : prevState.price;
                const discount = name === "discount" ? numericValue : prevState.discount;
                const discountAmount = (price * discount) / 100;
                const totalPrice = Math.round(price - discountAmount);
                newState.totalPrice = totalPrice;
            }

            return newState;
        });
    };


    useEffect(() => {
        if (response) {
            console.log('User created successfully:', response);
            navigate('/products');
        }
    }, [response, navigate]);

    const form = useRef(null)

    const HandleCreateUser = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        // console.log(event.target);
        var formData = new FormData(event.target);
        formData.append("totalPrice", state.totalPrice)
        // formData.append("category", selectedOptionCategory)

        selectedFiles.forEach((file, index) => {
            formData.append(`images`, file); // Change this to match the backend field name
        });
        try {
            await post(`${import.meta.env.VITE_API_URL}products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/products');
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };


    const [images, setImages] = useState([
        { id: uuidv4(), src: "" },
    ]);

    const addImageComponent = () => {
        setImages((currentImages) => [...currentImages, { id: uuidv4(), src: "" }]);
    };

    const removeImageComponent = (id: string) => {
        const newImages = images.filter((image) => image.id !== id);
        setImages(newImages);
        setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => images[index].id !== id));
    };
    const [enabled, setEnabled] = useState(false);
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
        isExpanded: enabled, // Control the expanded state with the `enabled` state
    });
    

    const handleToggle = () => {
        setEnabled(prev => !prev); // Toggle both the checkbox and the collapse
    };
    const [background, setBackground] = useState("#000000");
    const [colorArr, setColorArr] = useState([]);
    // let colorArr=[]
    const handleChangeColorPicker = (color) => {
        setBackground(color.hex)

    }
    const handleChangeColorPickerComplete = (action) => {
        // colorArr.push(background)
        action ==="confirm"?
        setColorArr((oldArray) => [...oldArray, background])
        :
        setColorArr(oldArray => oldArray.slice(0, -1));
    }
    const [sizeIsChecked, setSizeIsChecked] = useState(false);
    const [colorIsChecked, setColorIsChecked] = useState(false);

    const { getCollapseProps: getSizeCollapseProps, getToggleProps: getSizeToggleProps } = useCollapse({
        isExpanded: sizeIsChecked
    });
    const { getCollapseProps: getColorCollapseProps, getToggleProps: getColorToggleProps } = useCollapse({
        isExpanded: colorIsChecked
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <DefaultLayout>
            <Breadcrumb pageName={t("Create")} parentPageName={t("Products")} parentPageUrl="products" location={true} />






            <div className="flex flex-col gap-10">


                <div className="grid grid-cols-1 gap-9 ">
                    <div className="flex flex-col gap-9">

                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                            <form action="#" id="form" ref={form} encType="multipart/form-data" onSubmit={HandleCreateUser}>
                                <div className="p-6.5">
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                {t("Images")} <span className="text-meta-1">*</span>
                                            </label>


                                            <button type="button" onClick={addImageComponent} className="text-nowrap flex w-[100px] justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                                {t("Add")}
                                            </button>
                                            <div className="w-full flex flex-wrap gap-5">

                                                {images.map((image) => (

                                                    <SelectImage key={image.id} id={image.id} image={image.src} close={() => removeImageComponent(image.id)} onFileSelect={(file) => handleFileSelect(image.id, file)} />

                                                ))}


                                            </div>

                                        </div>


                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                {t("Product Name")} <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                name="name"
                                                value={state.name}
                                                onChange={handleChange}
                                                title="Product Name"
                                                type="text"
                                                placeholder={t("Enter Product Name")}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                {t("Price")} <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                name="price"
                                                value={state.price}
                                                onChange={handleChange}
                                                type="number"
                                                placeholder={t("Enter Price")}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                {t("Discount")} <span className="text-meta-1">*</span>
                                            </label>
                                            <div className="w-full flex items-center relative bg-transparent  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                                                <input
                                                    name="discount"
                                                    value={state.discount}
                                                    onChange={handleChange}
                                                    type="number"
                                                    placeholder={t("Enter Discount")}
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <p className={`absolute top-[0] ${i18n.language === "fa" ? "left-[16px]" : "right-[16px]"} transform translate-y-[50%] dark:text-white text-black`}>%</p>
                                            </div>

                                        </div>

                                        <div className="w-full xl:w-1/2">

                                            <label className="mb-2.5 block text-black dark:text-white">
                                                {t("Total Price")}
                                                <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                name="totalPrice"
                                                value={state.totalPrice}
                                                onChange={handleChange}
                                                type="number"
                                                placeholder={t("Total price")}
                                                disabled={true}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>


                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full xl:w-1/2">
                                            <div className="mb-4.5">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    {t("Category")} <span className="text-meta-1">*</span>
                                                </label>

                                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                                    <select
                                                        name="category"
                                                        title="select category"
                                                        value={selectedOptionCategory}
                                                        onChange={HandleChangeSelectCategory}
                                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
                                                            }`}
                                                    >

                                                        {responseCategory?.data?.map((category) =>
                                                            <option key={category.id} value={category.name} className="text-body dark:text-bodydark">
                                                                {category.name}
                                                            </option>
                                                        )}


                                                    </select>

                                                    <span className={`absolute top-1/2 ${i18n.language === "fa" ? "left-4" : "right-4"} z-30 -translate-y-1/2`}>
                                                        <svg
                                                            className="fill-current"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g opacity="0.8">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                                    fill=""
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full xl:w-1/2">

                                            <div className="mb-4.5">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    {t("Status")} <span className="text-meta-1">*</span>
                                                </label>

                                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                                    <select
                                                        name="status"
                                                        title="select Status"
                                                        value={selectedOptionStatus}
                                                        onChange={HandleChangeSelectStatus}
                                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
                                                            }`}
                                                    >

                                                        <option value="active" className="text-body dark:text-bodydark">
                                                            {t("active")}
                                                        </option>
                                                        <option value="inactive" className="text-body dark:text-bodydark">
                                                            {t("inactive")}
                                                        </option>

                                                    </select>

                                                    <span className={`absolute top-1/2 ${i18n.language === "fa" ? "left-4" : "right-4"} z-30 -translate-y-1/2`}>
                                                        <svg
                                                            className="fill-current"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g opacity="0.8">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                                    fill=""
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full xl:w-1/2">
                                            <div className="mb-4.5">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    {t("Number Of Product")} <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    name="number"
                                                    value={state.number}
                                                    onChange={handleChange}
                                                    type="number"
                                                    placeholder={t("Enter Number of Product")}
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />

                                            </div>
                                        </div>

                                        <div className="w-full xl:w-1/2">
                                            <div className="mb-4.5">
                                                <label className="flex items-center mb-2.5 text-black dark:text-white">
                                                    <p className="mr-3">{t("Details")}</p>
                                                    <SwitcherThree enabled={enabled} setEnabled={handleToggle} />
                                                </label>

                                                <div>
                                                    <section {...getCollapseProps()}>
                                                        <div className="mb-4">
                                                            <CheckboxTwo isChecked={sizeIsChecked} setIsChecked={()=>setSizeIsChecked(prev=>!prev)} content="size" />
                                                            <section  {...getSizeCollapseProps()}>

                                                            <div className="">
                                                                <MultiSelect id="multiSelect" />

                                                            </div>
                                                            </section>
                                                        </div>
                                                        <div className="">
                                                            <CheckboxTwo isChecked={colorIsChecked} setIsChecked={()=>setColorIsChecked(prev=>!prev)} content="color" />
                                                            
                                                            <section  {...getColorCollapseProps()}>
                                                            <div className="w-[225px] my-2" dir="ltr">
                                                                <ChromePicker className="w-full" color={background}
                                                                    onChange={handleChangeColorPicker} />
                                                                <div className="w-full flex">
                                                                <button className="text-black border-t w-full mt-[-2px] bg-white p-2" type="button" onClick={()=>handleChangeColorPickerComplete("confirm")}>{t("Confirm")}</button>
                                                                <button className="text-black border-t w-full mt-[-2px] bg-white p-2" type="button" onClick={()=>handleChangeColorPickerComplete("undo")}>{t("Undo")}</button>

                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 w-[225px]">

                                                            {colorArr.map((color) => 
                                                            
                                                            <div className="w-5 h-5 rounded-full"style={{background:color}}></div>
                                                            )}
                                                            </div>
                                                            </section>
                                                        </div>
                                                    </section>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                {t("Description")} <span className="text-meta-1">*</span>
                                            </label>

                                            <textarea id="" cols={30} rows={10}

                                                name="description"
                                                value={state.description}
                                                onChange={handleChange}
                                                title="Description"

                                                placeholder={t("Enter your Description")}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            >

                                            </textarea>
                                        </div>


                                    </div>


                                    <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        {t("Submit")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </div>

        </DefaultLayout>
    );
};

export default CreateProduct;
