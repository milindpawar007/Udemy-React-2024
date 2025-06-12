import { combineReducers, createStore } from 'redux';

import accountReducer from './features/Accounts/accountSlice';
import customerReducer from './features/Customers/customerSlice';

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

export const store = createStore(rootReducer);
