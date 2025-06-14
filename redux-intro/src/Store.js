// import { applyMiddleware, combineReducers, createStore } from 'redux';
// import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './features/Accounts/accountSlice';
import customerReducer from './features/Customers/customerSlice';

// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
