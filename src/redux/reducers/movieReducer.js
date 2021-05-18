import {
  FETCH_MOVIES_PENDING,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  NEW_MOVIES,
  DELETE_MOVIES,
  UPDATE_MOVIES,
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
  pending: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        pending: false,
        items: action.payload,
      };
    case FETCH_MOVIES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case NEW_MOVIES:
      return { ...state, item: action.payload, error: null };
    case DELETE_MOVIES:
      const arrayDelete = state.items.filter((value, index) => {
        return value.id !== action.payload;
      });
      return {
        ...state,
        items: arrayDelete,
        error: null
      };
    case UPDATE_MOVIES:
      const arrayUpdate = state.items.map((value, index) => {
        if (value.id === action.payload.id) {
          return (value[index] = action.payload);
        } else {
          return value;
        }
      });

      return {
        ...state,
        items: arrayUpdate,
      };
    default:
      return state;
  }
}
