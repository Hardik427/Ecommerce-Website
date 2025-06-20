import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cart/cartSlice"
import authApi from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import productsApi from './features/product/productsApi'
import orderApi from './features/order/ordersApi'
import uiReducer from './features/cart/uiSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    ui : uiReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware),
});
