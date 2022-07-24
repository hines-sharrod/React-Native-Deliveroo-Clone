import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import restaurantReducer from "./restaurant";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    restaurant: restaurantReducer
  }
});

export default store;
