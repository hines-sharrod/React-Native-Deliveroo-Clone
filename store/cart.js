import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalCost: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items = [...state.items, action.payload];
      state.totalCost = state.totalCost += +action.payload.price;
    },
    removeFromCart(state, action) {
      const selectedIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const newItems = [...state.items];

      if (selectedIndex !== -1) {
        newItems.splice(selectedIndex, 1);
      } else {
        console.warn(
          `Cannot remove product (id: ${action.payload.id}) as it is not in basket!`
        );
      }

      state.items = newItems;
      state.totalCost = state.totalCost -= +action.payload.price;
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectedCartItemsById = (state, id) =>
  state.cart.items.filter((item) => item.id === id);
export const getTotalCost = (state) => `$${state.cart.totalCost.toFixed(2)}`;

export default cartSlice.reducer;
