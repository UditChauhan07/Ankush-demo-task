import { createSlice } from "@reduxjs/toolkit";

export const QtySlice = createSlice({
    name: 'QtySlice',
    initialState: {
        qty:""
    }

    ,
    reducers: {
        quantity: (state, action) => {
            state.qty = action.payload;
            console.log("quantity is now",action.payload)
        },
        
    }

})
export const { quantity } = QtySlice.actions;
export default QtySlice.reducer;