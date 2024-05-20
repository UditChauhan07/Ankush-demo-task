import { createSlice } from '@reduxjs/toolkit';

export const ProductsSlice = createSlice({
    name: 'product',
    initialState: [
    ],
    reducers: {
        addProduct: (state, action) => {
            const newProduct = action.payload;
            const existingProductIndex = state.findIndex(product => product.id === newProduct.id);

            if (existingProductIndex !== -1) {
                state[existingProductIndex].quantity += 1;
            } else {
                state.push({ ...newProduct, quantity: 1 });
            }
        },
        removeProduct: (state, action) => {
            const productIdToRemove = action.payload;
            const existingProductIndex = state.findIndex(product => product.id === parseInt(productIdToRemove));
            if (existingProductIndex !== -1) {
                return state.filter((_, index) => index !== existingProductIndex);
            }
            return state;
        },
    }
})
export const { addProduct, removeProduct } = ProductsSlice.actions;
export default ProductsSlice.reducer;