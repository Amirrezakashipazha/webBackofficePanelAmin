import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import { useEffect, useState } from 'react';
import useAxios from "../../hooks/useAxios";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Input from "../../components/Forms/Input";
import SelectStatus from "../../components/Forms/SelectStatus";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateAdmins = () => {

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [selectedAvatar, setSelectedAvatar] = useState<any>();
  const [selectedOption, setSelectedOption] = useState<string>('active');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const [state, setState] = useState<{
    username: string;
    password: string;
    status: string;
    avatar: File | null; 
    errorMessage: {
      username: boolean;
      password: boolean;
    };
  }>({
    username: "",
    password: "",
    status: "active",
    avatar: null,
    errorMessage: {
      username: false,
      password: false,
    },
  });


  const schema = yup.object().shape({
    username: yup.string().required(t("Field Is Required")).min(3, t("Username should be at least 3 character")).max(20,t("username cant be more than 20 charachter")),
    password: yup.string().required(t("Field Is Required")).min(6, t("Password should be at least 6 character")).
    matches(/(?=.*[A-Z]{1,})/g,t("Password must have at least one uppercase characters"))
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
    setSelectedOption(e.target.value);
    console.log(e.target);
    changeTextColor();
    setState((prevState) => ({
      ...prevState,
      status: e.target.value,
    }));
  }

  const HandleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedAvatar(file); // Store the File object
      setState((prevState) => ({
        ...prevState,
        avatar: file,
      }));
    }
  }


  const { post, response, error, loading } = useAxios();

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      errorMessage: {
        ...prevState.errorMessage,
      }
    }));
  };

  useEffect(() => {
    if (response) {
      console.log('admin created successfully:', response);
      navigate('/admins');
    }
  }, [response, navigate]);


  const HandleCreateAdmin = async (formData: {
    username: string;
    password: string;
    avatar: FileList;
    status: string;
  }) => {

    formData.status = selectedOption;
    formData.avatar = selectedAvatar;
    try {
      await post(`${import.meta.env.VITE_API_URL}admins`, formData, {
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

              <form id="form" method="POST" encType="multipart/form-data" onSubmit={handleSubmit(HandleCreateAdmin)}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <Input errorMassge={(errors?.username?.message) ? errors.username.message : ""}
                        register={register("username")}
                        isRequired={true}
                        isValid={errors?.username ? false : true}
                        name='username'
                        label={t("Username")}
                        value={state.username} onChange={handleChange}
                        placeholder={t("Enter Username")}
                      />

                    </div>

                    <div className="w-full xl:w-1/2">
                      <Input errorMassge={(errors?.password?.message) ? errors?.password?.message : ""}
                        register={register("password")}
                        isValid={errors?.password ? false : true}
                        isRequired={true}
                        type="password"
                        name='password' label={t("Password")}
                        value={state.password} onChange={handleChange}
                        placeholder={t("Enter Password")} />

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
                        // value={selectedAvatar}
                        name="avatar"
                        onChange={HandleChangeAvatar}
                        className={`w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition ${i18n.language === "fa" ? "file:ml-5" : "file:mr-5"} file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary`}
                      />
                    </div>

                    <div className="w-full xl:w-1/2">

                      <div className="mb-4.5">
                        <SelectStatus label={t('Status')} value={selectedOption} onChange={HandleChangeSelect} isOptionSelected={isOptionSelected} />

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
