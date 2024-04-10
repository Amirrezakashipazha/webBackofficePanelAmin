import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import { useEffect, useRef, useState } from 'react';
import useAxios from "../../hooks/useAxios";
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import SelectImage from "../../components/Forms/selectImage";

const EditProduct = () => {
    const { get: getCategory, response: responseCategory, error: errorCategory, loading: loadingCategory } = useAxios();

    useEffect(() => {
        getCategory('http://localhost:3000/api/category?limit=1000')
    }, [])

    const [images2, setImages2] = useState();

    const form = useRef(null)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const handleFileSelect = (id: string, file: File) => {

        console.log(images);
        const newImages = images.filter((image) => image.id !== id);
        console.log(newImages);
        setImages2(newImages)

        // setImages(newImages);

        setSelectedFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            const index = images.findIndex((image) => image.id === id);
            console.log(index);
            newFiles[index] = file;
            return newFiles;
        });
    };
    const { id } = useParams();

    const navigate = useNavigate();
    const { get, response: responseSingleProduct, error: errorSingleProduct, loading: loadingSingleProduct } = useAxios();
    const [selectedOptionStatus, setSelectedOptionStatus] = useState<string>('active');
    const [selectedOptionCategory, setSelectedOptionCategory] = useState<string>('active');
    const [selectedOption, setSelectedOption] = useState<string>();
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };


    const [state, setState] = useState({
        name: "",
        price: null,
        category: null,
        discount: null,
        totalPrice: null,
        description: "",
        status: "deactive",
        images: ""
    });
    const HandleChangeSelect = (e) => {
        setSelectedOption(e.target.value);
        changeTextColor();


        setState((prevState) => ({
            ...prevState,
            status: e.target.value,
        }));
    }
    const [Select, setSelect] = useState();

    const { patch, response, error, loading } = useAxios();

    const [selectedAvatar, setSelectedAvatar] = useState();
    const HandleChangeAvatar = (e) => {
        setSelectedAvatar(e.target.files[0]);


        console.log(e.target.files[0]);
        setState((prevState) => ({
            ...prevState,
            avatar: e.target.value,
        }));
    }

    const handleChange = (event) => {
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
            console.log('User Updated successfully:', response);
            navigate('/products');
        }
    }, [response, navigate]);


    const HandleEditUser = async (event) => {
        event.preventDefault();
        var formData = new FormData(event.target);

        formData.append("totalPrice", (state.price * (100 - state.discount)) / 100)
        if (images2) {
            formData.append("prevImages", JSON.stringify(images2))
        } else {
            formData.append("prevImages", JSON.stringify(images))
        }
        selectedFiles.forEach((file, index) => {
            formData.append(`images`, file); // Change this to match the backend field name
        });
        for (var [key, value] of formData.entries()) {
            console.log(key, value);
        }
        try {
            await patch(`http://localhost:3000/api/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (err) {
            console.error('Error updating user:', err);
        }
    };



    useEffect(() => {
        if (id) {
            get(`http://localhost:3000/api/products/${id}`)
        }
    }, [id]);

    useEffect(() => {
        // console.log(responseSingleProduct);
        if (responseSingleProduct && responseSingleProduct[0]) {

            setState({
                name: responseSingleProduct[0]?.name || "",
                price: responseSingleProduct[0]?.price || 0,
                category: responseSingleProduct[0]?.category || "",
                discount: responseSingleProduct[0]?.discount || 0,
                totalPrice: responseSingleProduct[0]?.total_price || 0,
                description: responseSingleProduct[0]?.description || "",
                status: responseSingleProduct[0]?.status || "",
                images: JSON.parse(responseSingleProduct[0]?.image) || [],
            });
            setSelectedOptionCategory(responseSingleProduct[0]?.category);
            setSelectedOptionStatus(responseSingleProduct[0]?.status);

        }
    }, [responseSingleProduct]);
    useEffect(() => {
        console.log(state); // Logs the state when it changes
    }, [state]);

    const [images, setImages] = useState([
        { id: uuidv4(), src: "" },
    ]);
    useEffect(() => {
        console.log(images); // Logs the state when it changes
    }, [images]);
    useEffect(() => {
        if (state.images) {
            try {

                const imagesWithId = state.images.map((src) => ({
                    id: uuidv4(), // Generate a unique ID for each image
                    src,
                }));

                setImages(imagesWithId);
            } catch (error) {
                console.error("Error parsing images JSON:", error);
            }
        }
    }, [state.images]); // Make sure to include state.images in the dependency array

    const addImageComponent = () => {
        setImages((currentImages) => [...currentImages, { id: uuidv4(), src: "" }]);
    };

    const removeImageComponent = (id: string) => {
        const newImages = images.filter((image) => image.id !== id);
        setImages(newImages);
        setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => images[index].id !== id));
    };


    const HandleChangeSelectCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOptionCategory(e.target.value);
        changeTextColor();


        setState((prevState) => ({
            ...prevState,
            status: e.target.value,
        }));
    }
    const HandleChangeSelectStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOptionStatus(e.target.value);
        changeTextColor();


        setState((prevState) => ({
            ...prevState,
            status: e.target.value,
        }));
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit" parentPageName="products" location={true}/>

            <div className="flex flex-col gap-10">


                <div className="grid grid-cols-1 gap-9 ">
                    <div className="flex flex-col gap-9">

                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                            <form action="#" id="form" ref={form} encType="multipart/form-data" onSubmit={HandleEditUser}>
                                <div className="p-6.5">
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Images <span className="text-meta-1">*</span>
                                            </label>


                                            <button type="button" onClick={addImageComponent} className="flex w-[100px] justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                                Add
                                            </button>
                                            <div className="w-full flex flex-wrap gap-5">

                                                {images.map((image) => (

                                                    <SelectImage key={image.id} id={image.id} image={image.src} close={() => removeImageComponent(image.id)} onFileSelect={(file) => {

                                                        // setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => images[index].id !== image.id));

                                                        handleFileSelect(image.id, file)
                                                    }} />

                                                ))}


                                            </div>

                                        </div>


                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Product Name <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                name="name"
                                                value={state.name}
                                                onChange={handleChange}
                                                title="Product Name"
                                                type="text"
                                                placeholder="Enter Product Name"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Price <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                name="price"
                                                value={state.price}
                                                onChange={handleChange}
                                                type="number"
                                                placeholder="Enter Price"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Discount <span className="text-meta-1">*</span>
                                            </label>
                                            <div className="w-full flex items-center relative bg-transparent  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                                                <input
                                                    name="discount"
                                                    value={state.discount}
                                                    onChange={handleChange}
                                                    type="number"
                                                    placeholder="Enter Discount"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <p className="absolute top-[0] right-[16px] transform translate-y-[50%] dark:text-white text-black">%</p>
                                            </div>

                                        </div>

                                        <div className="w-full xl:w-1/2">

                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Total price <span className="text-meta-1">*</span>
                                            </label>
                                            {/* <input
                                                name="totalPrice"
                                                value={state.totalPrice}
                                                onChange={handleChange}
                                                type="number"
                                                placeholder="Total price"
                                                disabled={true}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            /> */}
                                            <div className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                                                {state.totalPrice}
                                            </div>
                                        </div>
                                    </div>


                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full xl:w-1/2">
                                            <div className="mb-4.5">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Category <span className="text-meta-1">*</span>
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

                                                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
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
                                                    Status <span className="text-meta-1">*</span>
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
                                                            active
                                                        </option>
                                                        <option value="inactive" className="text-body dark:text-bodydark">
                                                            inactive
                                                        </option>

                                                    </select>

                                                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
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
                                        <div className="w-full">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Description <span className="text-meta-1">*</span>
                                            </label>

                                            <textarea id="" cols={30} rows={10}

                                                name="description"
                                                value={state.description}
                                                onChange={handleChange}
                                                title="Description"

                                                placeholder="Enter your Description"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            >

                                            </textarea>
                                        </div>


                                    </div>


                                    <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        Submit
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

export default EditProduct;
