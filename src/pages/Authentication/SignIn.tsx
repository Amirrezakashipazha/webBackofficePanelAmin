import React, { FormEvent, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useColorMode from '../../hooks/useColorMode';
import Loading from '../../components/Loading';
import { toast } from 'react-hot-toast';
import Input from '../../components/Input';
import Password from '../../components/Icons/Password';
import User from '../../components/Icons/User';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SignIn: React.FC = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { post, response, error, loading }: {
    post: any;
    response: {
      status: number;
      msg: string;
    } | null;
    error: any;
    loading: any;
  } = useAxios();

  type ErrorMessage = {
    username: boolean;
    password: boolean;
  };

  const [state, setState] = useState<{
    username: string;
    password: string;
    responseData: null;
    errorMessage: ErrorMessage;
  }>({
    username: "",
    password: "",
    responseData: null,
    errorMessage: {
      username: false,
      password: false,
    },
  });

  const HandleSubmitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState({
      ...state,
      errorMessage: {
        username: !state.username,
        password: !state.password,
      },
    });

    if (!state.username || !state.password) {
      return
    }

    try {
      await post(`${import.meta.env.VITE_API_URL}auth/admin/login`, {
        username: state.username,
        password: state.password,
      });
    } catch (err) {
      console.error('Error auth:', err);
    }
  }
  useEffect(() => {
    console.log(response);
    if (response && response['status'] === 200) {
      navigate('/');
    }
  }, [response])

  useEffect(() => {
    console.log(error);
    if (error) {
      toast.error(error.data.msg, {
        duration: 2000,
      })
    }
  }, [error])

  const [colorMode] = useColorMode();

  useEffect(() => {
    if (colorMode === "dark") {
      document.querySelector('body')?.classList.add("dark")
    }
  }, [])

  const HandleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      username: e.target.value,
      errorMessage: {
        ...state.errorMessage,
        username: !e.target.value,
      },
    });
  };

  const HandleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      password: e.target.value,
      errorMessage: {
        ...state.errorMessage,
        password: !e.target.value,
      },
    });
  };

  return (


    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">


        <div className="w-full mx-auto xl:w-1/2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              {t('Sign In to panelAdmin')}
            </h2>

            <form onSubmit={HandleSubmitLogin}>

              <Input errorMassge={state.errorMessage.username ? t("Field Is Required") : ""}
                notValid={state.errorMessage.username} name='username' label={t("Username")}
                value={state.username} onChange={HandleChangeUsername}
                placeholder={t("Enter your Username")} icon={
                  <User />
                } />

              <Input errorMassge={state.errorMessage.password ? t("Field Is Required") : ""}
                notValid={state.errorMessage.password} type='password' name='password' label={t("Password")}
                value={state.password} onChange={HandleChangePassword}
                placeholder={t("Enter your Password")} icon={
                  <Password />
                } />

              <div className="mb-5 relative">
                {loading ?
                  <Loading />
                  :
                  <input
                    type="submit"
                    value={t("Sign In")}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SignIn;
