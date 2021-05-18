// test-utils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { combineReducers } from "redux";

import {
  FETCH_MOVIES_PENDING,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  NEW_MOVIES,
  DELETE_MOVIES,
  UPDATE_MOVIES,
} from "./src/redux/actions/types";
// Import your own reducer

const middleware = [thunk];

const startingState = {
  items: [
    {
      title: "Vingadores: Ultimato",
      description:
        "Em Vingadores: Ultimato, após Thanos eliminar metade das criaturas vivas em Vingadores: Guerra Infinita, os heróis precisam lidar com a dor da perda de amigos e seus entes queridos. Com Tony Stark (Robert Downey Jr.) vagando perdido no espaço sem água nem comida, o Capitão América/Steve Rogers (Chris Evans) e a Viúva Negra/Natasha Romanov (Scarlett Johansson) precisam liderar a resistência contra o titã louco.",
      watched: 0,
      platform: "netflix",
      note: 5,
      id: 6,
    },
    {
      title: "Anne with an e",
      description:
        "Harry Potter (Daniel Radcliffe) é um garoto órfão de 10 anos que vive infeliz com seus tios, os Dursley. Até que, repentinamente, ele recebe uma carta contendo um convite para ingressar em Hogwarts, uma famosa escola especializada em formar jovens bruxos. Inicialmente Harry é impedido de ler a carta por seu tio Válter (Richard Griffiths), mas logo ele recebe a visita de Hagrid (Robbie Coltrane), o guarda-caça de Hogwarts, que chega em sua casa para levá-lo até a escola. A partir de então Harry passa a conhecer um mundo mágico que jamais imaginara, vivendo as mais diversas aventuras com seus mais novos amigos, Rony Weasley (Rupert Grint) e Hermione Granger (Emma Watson).\n\n",
      watched: 1,
      platform: "youtube",
      note: 5,
      id: 7,
    },
  ],
  item: {},
  pending: false,
  error: null,
};

function postReducer(state = startingState, action) {
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
        error: null,
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

const reducer = combineReducers({ postReducer });

function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState, applyMiddleware(...middleware)),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
