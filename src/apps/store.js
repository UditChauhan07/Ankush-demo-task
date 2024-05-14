import { configureStore } from '@reduxjs/toolkit';
import  ProductsSlice  from '../features/ProductData/ProductSlice';

export default configureStore({
  reducer: {
    product:ProductsSlice
  },
});
