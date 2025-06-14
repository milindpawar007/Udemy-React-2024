import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  fullName: '',
  nationaID: '',
  createdAT: '',
};

const customerSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationaID) {
        return {
          payload: { fullName, nationaID, createdAT: new Date().toISOString() },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationaID = action.payload.nationaID;
        state.createdAT = action.payload.createdAT;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case 'customer/createCustomer':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationaID: action.payload.nationaID,
//         createdAT: action.payload.createdAT,
//       };
//     case 'customer/updateName':
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationaID) {
//   return {
//     type: 'customer/createCustomer',
//     payload: {
//       fullName,
//       nationaID,
//       createdAT: new Date().toISOString(),
//     },
//   };
// }

// export function updateName(fullName) {
//   return { type: 'customer/updateName', payload: fullName };
// }
