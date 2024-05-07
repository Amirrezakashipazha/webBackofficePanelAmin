import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import { useEffect, useState } from 'react';
import useAxios from "../../hooks/useAxios";
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const EditAdmins = () => {
    const { t ,i18n} = useTranslation();

    const { id } = useParams();

    const navigate = useNavigate();
    const { get, response: responseSingleAdmin, error: errorSingleAdmin, loading: loadingSingleAdmin } = useAxios();

    const [selectedOption, setSelectedOption] = useState<string>();
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };


    const [state, setState] = useState({
        username: "",
        password: "",
        status: "active",
        avatar: ""
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


    const HandleEditAdmin = async (event) => {
        event.preventDefault();
        var formData = new FormData(event.target);
        formData.append("status", selectedOption)
        for (var [key, value] of formData.entries()) {
            console.log(key, value);
        }
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
            setState({
                username: responseSingleAdmin[0].username || "",
                status: responseSingleAdmin[0].status || "active",
                password: responseSingleAdmin[0].password || "",
                avatar: responseSingleAdmin[0].avatar || "",
            });
            setSelectedOption(responseSingleAdmin[0]?.status);

            console.log(state);
        }
    }, [responseSingleAdmin]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <DefaultLayout>
            <Breadcrumb pageName={t("Edit")} parentPageName={t("Admins")} parentPageUrl={"admins"} location={true} />

            <div className="flex flex-col gap-10">


                <div className="grid grid-cols-1 gap-9 ">
                    <div className="flex flex-col gap-9">

                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                            <form action="#" onSubmit={HandleEditAdmin}>
                                <div className="p-6.5">
                                    <div className="relative z-30 mx-auto mb-4.5  h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                                        <div className="relative drop-shadow-2 w-[152px] h-[152px]">
                                            <img src={selectedAvatar && URL.createObjectURL(selectedAvatar) || state.avatar} alt="profile" className="w-full h-full rounded-full object-cover" />
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
                                                    // value={selectedAvatar||0}
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
                                                name="username"
                                                value={responseSingleAdmin?.username || state.username}
                                                onChange={handleChange}
                                                title="User name"
                                                type="text"
                                                placeholder={t("Enter Your name")}

                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                {t("Password")} <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                name="password" value={state.password}
                                                onChange={handleChange}
                                                type="password"
                                                placeholder={t("Enter Your password")}

                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
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


                                    <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        {t('Submit')}
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

export default EditAdmins;
