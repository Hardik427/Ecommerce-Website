import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cart/cartSlice"
import authApi from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import productsApi from './features/product/productsApi'
import orderApi from './features/order/ordersApi'
import uiReducer from './features/cart/uiSlice'
import adminApi from './features/admin/adminApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    ui : uiReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer ,
    [adminApi.reducerPath]: adminApi.reducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, orderApi.middleware,adminApi.middleware),
});
