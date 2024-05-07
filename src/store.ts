import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const ItemsSlice = createSlice({
    name: "panel",
    initialState: {
        admins: [],
        categories: [],
        orders: [],
        products: [],
        sale: [],
        users: [],
        notification: [],
        setting: {},
        user: {},
    },
    reducers: {
        setAdmins: (state, action) => {
            state.admins = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setSale: (state, action) => {
            state.sale = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setNotificatin: (state, action) => {
            state.notification = action.payload;
        },
        clearNotificatin: (state) => {
            state.notification = [];
        },
        setSetting: (state, action) => {
            state.setting = {
                ...state.setting,
                ...action.payload
            }
        },
        setUser: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload
            }
        },

    },
});

export const {
    setSetting,
    setUser,
    setNotificatin,
    clearNotificatin,
    setAdmins,
    setCategories,
    setOrders,
    setProducts,
    setSale,
    setUsers
} = ItemsSlice.actions;

export const store = configureStore({
    reducer: {
        panel: ItemsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});
export const persistor = persistStore(store);
