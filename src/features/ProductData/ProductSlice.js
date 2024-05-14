import { createSlice } from '@reduxjs/toolkit';

export const ProductsSlice = createSlice({
    name: 'product',
    initialState: [

    ],
    reducers: {
        addProduct: (state, action) => {
            const newProduct = action.payload;
            state.push(newProduct);
        }
    }

})
export const { addProduct } = ProductsSlice.actions;
export default ProductsSlice.reducer;