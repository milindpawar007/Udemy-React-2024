import { createStore } from 'redux';

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullName: '',
  nationaID: '',
  createdAT: '',
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,

        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case 'account/payLoan':
      if (state.loan === 0) return state;
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    case 'customer/createCustomer':
      return {
        ...state,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationaID: action.payload.nationaID,
        createdAT: action.payload.createdAT,
      };
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(accountReducer);

function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}
function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount: amount, purpose: purpose },
  };
}
function payLoan() {
  return {
    type: 'account/payLoan',
  };
}

store.dispatch(deposit(5000));

console.log(store.getState());

store.dispatch(withdraw(500));

console.log(store.getState());

store.dispatch(requestLoan(1000, 'Buy the Car'));

console.log(store.getState());

store.dispatch(payLoan());

console.log(store.getState());

function createCustomer(fullname, nationaID) {
  return {
    type: 'customer/createCustomer',
    payload: {
      fullname,
      nationaID,
      createdAT: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return { type: 'customer/updateName', payload: fullName };
}
