import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import 'flowbite/dist/flowbite.css';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Products from './pages/Products/products';
import Users from './pages/Users/users';
import Create from './pages/Users/Create';
import Edit from './pages/Users/Edit';
import CreateProduct from './pages/Products/create';
import EditProduct from './pages/Products/edit';
import Categories from './pages/Categories/Categories';
import CreateCategory from './pages/Categories/Create';
import EditCategory from './pages/Categories/edit';
import Orders from './pages/Orders/orders';
import Sale from './pages/Sale/sale';
import { useNavigate } from 'react-router-dom';
import useAxios from './hooks/useAxios';

import AccountSetting from './pages/accountSetting/accountSetting';
import Admins from './pages/admins/admins';
import CreateAdmins from './pages/admins/Create';
import EditAdmins from './pages/admins/Edit';
import getDirection from './utils/GetDirection';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { setAdmins, setCategories, setNotificatin, setOrders, setProducts, setSale, setSetting, setUser, setUsers } from './store';
import NotFound from './pages/404';
// import dotenv from 'dotenv';

function App() {
  const panel = useSelector((state) => state.panel);
  const Dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const { get, response, error, loading: loadingIsadmin } = useAxios();
  const { get: getsetting, response: responsesetting, error: errorsetting, loading: loadingsetting } = useAxios();
  const { get: getAllData, response: responseAll, error: errorAll, loading: loadingAll } = useAxios();
  const { get: getOrder, response: responseOrder, error: errorOrder, loading: loadingOrder } = useAxios();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  useEffect(() => {
    const checkAdminStatus = async () => {
      await get(`${import.meta.env.VITE_API_URL}auth/admin/isLoggedin`);
    };
    checkAdminStatus();

    const getSetting = async () => {
      await getsetting(`${import.meta.env.VITE_API_URL}setting`);

    };
    getSetting();

    const getAll = async () => {
      await getAllData(`${import.meta.env.VITE_API_URL}all`);
    };
    getAll();
  }, [navigate]);

  useEffect(() => {
    Dispatch(setAdmins(responseAll?.admins))
    Dispatch(setCategories(responseAll?.categories))
    // Dispatch(setOrders(responseAll?.orders))
    Dispatch(setProducts(responseAll?.products))
    Dispatch(setSale(responseAll?.sale))
    Dispatch(setUsers(responseAll?.users))
  }, [responseAll])

  useEffect(() => {
    console.log(panel);
  }, [panel])

  useEffect(() => {

    if (response?.status === 'error') {
      navigate('/auth/signin');
    } else {
      // setResponse(prev => ({ ...prev, user: response?.user }))
      if (response?.user) {
        Dispatch(setUser(response?.user))
      }
    }

    if (responsesetting) {
      // setResponse(prev => ({ ...prev, setting: responsesetting[0] }));
      Dispatch(setSetting(responsesetting[0]))
    }

    const link = document.querySelector("link[rel*='icon']");

    if (link) {
      link.href = panel?.setting?.icon;
    }
    const meta_description = document.querySelector("meta[name='description']");

    if (meta_description) {
      meta_description.content = panel?.setting?.meta_description;
    }

    if (response || error) {
      setLoading(false);
    }
  }, [response, error]);

  useEffect(() => {
    const fetchNewOrders = () => {
      getOrder(`${import.meta.env.VITE_API_URL}order`);
    };

    const interval = setInterval(fetchNewOrders, 5000); 
    return () => clearInterval(interval);
  }, []);

  let oldOrderIds
  
    ;



  useEffect(() => {
    oldOrderIds = panel?.orders?.map(order => order.id) || [];
    Dispatch(setNotificatin(responseOrder?.data.filter(order => !oldOrderIds.includes(order.id))))
   console.log(oldOrderIds);
   console.log(responseOrder?.data);
  }, [responseOrder])


  useEffect(() => {
    if (i18n.language === "fa") {
      document.querySelector("html")?.setAttribute("lang", "fa")
    } else {
      document.querySelector("html")?.setAttribute("lang", "en")
    }
  }, [i18n.language])

  // useEffect(() => {
  //   const handleRightClick = event => {
  //     event.preventDefault();
  //   };

  //   document.addEventListener('contextmenu', handleRightClick);

  //   return () => {
  //     document.removeEventListener('contextmenu', handleRightClick);
  //   };
  // }, []);



  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Users />
            </>
          }
        />
        <Route
          path="/users/create"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Create />
            </>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Edit />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Products />

            </>
          }
        />
        <Route
          path="/products/create"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <CreateProduct />
            </>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <EditProduct />
            </>
          }
        />
        <Route
          path="/categories"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Categories />

            </>
          }
        />
        <Route
          path="/categories/create"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <CreateCategory />

            </>
          }
        />
        <Route
          path="/categories/edit/:id"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <EditCategory />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Orders />
            </>
          }
        />
        <Route
          path="/sale"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Sale />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />

        <Route
          path="/admins"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Admins />
            </>
          }
        />
        <Route
          path="/admins/create"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <CreateAdmins />

            </>
          }
        />
        <Route
          path="/admins/edit/:id"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <EditAdmins />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <NotFound />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
