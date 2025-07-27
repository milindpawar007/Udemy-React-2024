import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],

  //   cart: [
  //     {
  //       pizzaID: 12,
  //       name: 'Meditraina',
  //       quantity: 2,
  //       unitePrice: 16,
  //       totalPrice: 32,
  //     },
  //   ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload= id;

      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (!item) {
        console.warn(`Item with pizzaID ${action.payload} not found in cart.`);
        return;
      }

      item.quantity++;
      item.totalPrice = item.quantity * item.unitePrice;
    },
    decreseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (!item) return; // Safety check

      if (item.quantity === 1) {
        // Remove item from cart
        // state.cart = state.cart.filter((i) => i.pizzaID !== action.payload);
        cartSlice.caseReducers.deleteItem(state, action);
      } else {
        // Decrease quantity and update total
        item.quantity--;
        item.totalPrice = item.quantity * item.unitePrice;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increseItemQuantity,
  decreseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQunatityByid = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaID === id)?.quantity ?? 0;

export const getCart = (state) => state.cart.cart;
