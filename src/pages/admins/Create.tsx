import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import { useEffect, useRef, useState } from 'react';
import useAxios from "../../hooks/useAxios";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
// import ImageZoom from "react-image-zooom";

const CreateAdmins = () => {

  const { t ,i18n} = useTranslation();

  const navigate = useNavigate();

  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('active');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };


  const [state, setState] = useState({
    username: "",
    email: "",
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
  const HandleChangeAvatar = (e) => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (response) {
      console.log('admin created successfully:', response);
      navigate('/admins');
    }
  }, [response, navigate]);

  const form = useRef(null)

  const HandleCreateAdmin = async (event) => {
    event.preventDefault();
    // console.log(event.target);
    var formData = new FormData(event.target);
    formData.append("status",selectedOption)
    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      await post('http://localhost:3000/api/admins', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admins');
    } catch (err) {
      console.error('Error creating admin:', err);
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <DefaultLayout>
      <Breadcrumb pageName={t("Create")} parentPageName={t("Admins")} parentPageUrl={"admins"} location={true} />
    

      <div className="flex flex-col gap-10">


        <div className="grid grid-cols-1 gap-9 ">
          <div className="flex flex-col gap-9">

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

              <form action="#" id="form" ref={form} encType="multipart/form-data" onSubmit={HandleCreateAdmin}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        {t('Username')} <span className="text-meta-1">*</span>
                      </label>
                      <input
                        name="username"
                        value={state.username}
                        onChange={handleChange}
                        title="User name"
                        type="text"
                        placeholder={t("Enter Your name")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        {t('Password')} <span className="text-meta-1">*</span>
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
                    <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                        {t('Attach file')}
                      </label>
                      <input
                        title="file"
                        type="file"
                        value={selectedAvatar}
                        name="avatar"
                        onChange={HandleChangeAvatar}
                        className={`w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition ${i18n.language==="fa"?"file:ml-5":"file:mr-5"} file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary`}
                      />
                    </div>

                    <div className="w-full xl:w-1/2">

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

                          <span className={`absolute top-1/2 ${i18n.language==="fa"?"left-4":"right-4"} z-30 -translate-y-1/2`}>
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

export default CreateAdmins;
