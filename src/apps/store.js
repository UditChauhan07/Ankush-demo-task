import { configureStore } from '@reduxjs/toolkit';

import  ProductsSlice  from '../features/ProductData/ProductSlice';
import QuantitySlice from '../features/ProductData/QuantitySlice';

export const store = configureStore({
  reducer: {
    product:ProductsSlice,
    quanti:QuantitySlice
  },
});

