import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import { useEffect, useState } from 'react';
import useAxios from "../../hooks/useAxios";
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface ApiResponseObject {
    avatar?: string;
    created_at: string;
    id: number;
    password?: string;
    role: string;
    status: string;
    username: string;
}

interface UseAxiosReturn {
    get: (url: string) => void;
    response: ApiResponseObject[] | null;
    error: any;
    loading: boolean;
}


const EditAdmins = () => {
    const { t } = useTranslation();

    const { id } = useParams();

    const navigate = useNavigate();
    const { get, response: responseSingleAdmin, error: errorSingleAdmin, loading: loadingSingleAdmin } = useAxios() as UseAxiosReturn;;

    const [selectedOption, setSelectedOption] = useState<string>();
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };


    const [state, setState] = useState<{
        username: string,
        password: string,
        status: string,
        avatar: File | string;

    }>({
        username: "",
        password: "",
        status: "active",
        avatar: ""
    });


    const schema = yup.object().shape({
        username: yup.string().required(t("Field Is Required")).min(3, t("Username should be at least 3 character")).max(20, t("Username cant be more than 20 charachter")),
        password: yup.string().required(t("Field Is Required")).min(6, t("Password should be at least 6 character")).
            matches(/(?=.*[A-Z]{1,})/g, t("Password must have at least one uppercase characters"))
            .matches(/(?=.*[a-z])/g, t("Password must contain at least one lowercase character"))
            .matches(/(?=.*\W)/g, t("Password must contain a special character"))
            .matches(/(?=.*\d)/g, t("Password must contain at least one number")),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    }: {
        register: any,
        handleSubmit: any,
        formState: { errors: any },
    } = useForm({ resolver: yupResolver(schema) });



    const HandleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsChanged(true)
console.log(state);
        setSelectedOption(e.target.value);
        changeTextColor();


        setState((prevState) => ({
            ...prevState,
            status: e.target.value,
        }));
    }

    const { patch, response, error, loading } = useAxios();

    const [selectedAvatar, setSelectedAvatar] = useState<File>();
    const HandleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChanged(true)

        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedAvatar(file);
            setState((prevState) => ({
                ...prevState,
                avatar: file,
            }));
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChanged(true)
        console.log(errors);
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(state);
    };

    useEffect(() => {
        if (response) {
            console.log('admin Updated successfully:', response);
            navigate('/admins');
        }
    }, [response, navigate]);


    const HandleEditAdmin = async (formData: {
        username: string;
        password: string;
        avatar: FileList;
        status: string;
    }) => {
        console.log('object');
        // event.preventDefault();
        // var formData = new FormData(event.target);
        // formData.append("status", selectedOption || "sctive")
        // for (var [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        formData.status = selectedOption || "sctive";

        try {
            await patch(`${import.meta.env.VITE_API_URL}admins/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (err) {
            console.error('Error updating admin:', err);
        }
    };



    useEffect(() => {
        if (id) {
            get(`${import.meta.env.VITE_API_URL}admins/${id}`)
        }
    }, [id]);

    useEffect(() => {

        if (responseSingleAdmin) {
            console.log(responseSingleAdmin);
            setState({
                username: responseSingleAdmin[0].username || "",
                status: responseSingleAdmin[0].status || "active",
                password: responseSingleAdmin[0].password || "",
                avatar: responseSingleAdmin[0].avatar || "",
            });
            setSelectedOption(responseSingleAdmin[0]?.status);
        }
    }, [responseSingleAdmin]);

    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    useEffect(() => {
        const updateImageUrl = (file: File): string | null => {
            if (file) {
                const url = URL.createObjectURL(file);
                setImageUrl(url);
                return url;
            }
            return null;
        };
        let currentUrl: string | null = null;
        if (selectedAvatar) {
            currentUrl = updateImageUrl(selectedAvatar);
        } else if (state.avatar instanceof File) {
            currentUrl = updateImageUrl(state.avatar);
        } else {
            setImageUrl(typeof state.avatar === 'string' ? state.avatar : undefined);
        }
        return () => {
            if (currentUrl) {
                URL.revokeObjectURL(currentUrl);
            }
        };
    }, [selectedAvatar, state.avatar]);


    const [isChanged, setIsChanged] = useState<boolean>(false);



    if (loading || loadingSingleAdmin) return <p>Loading...</p>;
    if (error || errorSingleAdmin) return <p>Error: {error}</p>;

    return (
        <DefaultLayout>
            <Breadcrumb pageName={t("Edit")} parentPageName={t("Admins")} parentPageUrl={"admins"} location={true} />

            <div className="flex flex-col gap-10">


                <div className="grid grid-cols-1 gap-9 ">
                    <div className="flex flex-col gap-9">

                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                            <form action="#" onSubmit={handleSubmit(HandleEditAdmin)}>
                                <div className="p-6.5">
                                    <div className="relative z-30 mx-auto mb-4.5  h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                                        <div className="relative drop-shadow-2 w-[152px] h-[152px]">
                                            <img
                                                src={imageUrl}
                                                alt="profile"
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                            <label
                                                htmlFor="profile"
                                                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                                            >
                                                <svg
                                                    className="fill-current"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 14 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                                                        fill=""
                                                    />
                                                </svg>
                                                <input
                                                    title="file"
                                                    type="file"
                                                    name="avatar"
                                                    onChange={HandleChangeAvatar}
                                                    id="profile"
                                                    className="sr-only"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                {t("Username")} <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                {...register("username")}
                                                // name="username"
                                                value={state.username}
                                                onChange={handleChange}
                                                title="User name"
                                                type="text"
                                                placeholder={t("Enter Your name")}
                                                // defaultValue={state.username}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                            <p className="text-danger text-sm mt-1">{errors?.username?.message}</p>

                                        </div>

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                {t("Password")} <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                {...register("password")}

                                                // name="password" 
                                                value={state.password}
                                                // defaultValue={state.password}

                                                onChange={handleChange}
                                                type="password"
                                                placeholder={t("Enter Your password")}

                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                            <p className="text-danger text-sm mt-1">{errors?.password?.message}</p>

                                        </div>
                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">


                                        <div className="w-full ">

                                            <div className="mb-4.5">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    {t('Status')}
                                                </label>

                                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                                    <select
                                                        title="select status"
                                                        value={selectedOption}
                                                        onChange={HandleChangeSelect}
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
                                            </div>
                                        </div>
                                    </div>

                                    {isChanged && <div className={`flex justify-end gap-4.5 `}>
                                        <button
                                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                            type="button"
                                            onClick={() => navigate('/admins')}
                                        >
                                            {t("Cancel")}
                                        </button>
                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            type="submit"
                                        >
                                            {t("Save")}
                                        </button>
                                    </div>}

                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </div>

        </DefaultLayout>
    );
};

export default EditAdmins;
