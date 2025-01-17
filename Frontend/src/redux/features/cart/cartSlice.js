import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products : [],
    selectedItems : 0,
    totalPrice : 0,
    tax : 0,
    taxeRate : 0.05,
    grandTotal : 0
  }

const createSlice = createSlice(
    {
        name: 'cart',
        initialState,
        reducers:{
            AddtoCart : (state,action) => {
                const isExist = state.products.find((product) => product.id === action.payload.id);

                if(!isExist) {
                    state.products.push({...action.payload,quantity: 1})
                } else{
                    console.log("Items already added")
                };


                state.selectedItems = setSelectedItems(state)
                state.totalPrice = setTotalPrice(state);
            }
        }
})

export const setSelectedItems = (state) => state.products.reduce((total,product) => {
    return Number(total + product.quantity)
})

export const setTotalPrice = (state) => state.products.reduce((total, product) =>
{
    return Number(total + product.quantity)
})