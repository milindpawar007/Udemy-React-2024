const initialStateCustomer = {
  fullName: '',
  nationaID: '',
  createdAT: '',
};

export default function customerReducer(state = initialStateCustomer, action) {
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

export function createCustomer(fullName, nationaID) {
  return {
    type: 'customer/createCustomer',
    payload: {
      fullName,
      nationaID,
      createdAT: new Date().toISOString(),
    },
  };
}

export function updateName(fullName) {
  return { type: 'customer/updateName', payload: fullName };
}
