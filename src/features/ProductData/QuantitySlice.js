import { createSlice } from "@reduxjs/toolkit";

export const QtySlice = createSlice({
    name: 'QtySlice',
    initialState: {
        qty:""
    }

    ,
    reducers: {
        quantity: (state, action) => {
            console.log(action.payload)
            state.qty = action.payload;
          
        }
    }

})
export const { quantity } = QtySlice.actions;
export default QtySlice.reducer;