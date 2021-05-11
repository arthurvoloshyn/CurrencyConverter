const initState = { valute: {} };

function rootReducer(state = initState, action) {
  switch (action.type) {
    case 'SET_VALUTE': {
      return { ...state, valute: action.valute };
    }

    default:
      return state;
  }
}

export default rootReducer;
