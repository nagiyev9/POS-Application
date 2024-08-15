import { createSlice } from '@reduxjs/toolkit';

const cardSlice = createSlice({
    name: "card",
    initialState: {
      cardItems: localStorage.getItem("card")
        ? JSON.parse(localStorage.getItem("card")).cardItems
        : [],
      total: localStorage.getItem("card")
        ? JSON.parse(localStorage.getItem("card")).total
        : 0,
      tax: 8,
    },
    reducers: {
        addProduct: (state, action) => {
            console.log(state.cardItems);
            const findCardItem = state.cardItems.find(
                (item) => item._id === action.payload._id
            );

            if (findCardItem) {
                findCardItem.quantity = findCardItem.quantity + 1;
            } else {
                state.cardItems.push(action.payload);
            }

            state.total += action.payload.price
        },

        deleteCard: (state, action) => {
            const itemToDelete = state.cardItems.find(item => item._id === action.payload._id);

            if (itemToDelete) {
                state.cardItems = state.cardItems.filter(item => item._id !== action.payload._id);

                state.total = state.cardItems.reduce((total, item) => total + item.price * item.quantity, 0);
            }
        },

        increase: (state, action) => {
            const cardItem = state.cardItems.find(
                (item) => item._id === action.payload._id
            );

            cardItem.quantity += 1;
            state.total = state.cardItems.reduce((total, item) => total + item.price * item.quantity, 0);
        },

        decrease: (state, action) => {
            const cardItem = state.cardItems.find(
                (item) => item._id === action.payload._id
            );

            cardItem.quantity -= 1;

            if (cardItem.quantity < 1) {
                state.cardItems = state.cardItems.filter(
                    (item) => item._id !== action.payload._id
                );
            }

            state.total = state.cardItems.reduce((total, item) => total + item.price * item.quantity, 0);
        },

        reset: (state) => {
            state.cardItems = [];
            state.total = 0;
        },
    },
});

export const { addProduct, deleteCard, increase, decrease, reset } = cardSlice.actions;
export default cardSlice.reducer