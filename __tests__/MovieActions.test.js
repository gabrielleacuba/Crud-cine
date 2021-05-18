import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../src/redux/actions/movieActions";
import * as types from "../src/redux/actions/types";
import expect from "expect"; // You can use any testing library
import axios from "axios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
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

describe("Testing DELETE_MOVIE", () => {
  let mock, expectedActions, store;

  beforeEach(() => {
    mock = jest.spyOn(axios, "delete");
  });
  afterEach(() => {
    mock.mockRestore();
  });

  it("creates DELETE_MOVIE when ready to delete the movie", async () => {
    mock.mockResolvedValue(); // mock axios.post to resolve

    expectedActions = [{ type: types.DELETE_MOVIES, payload: 6 }];
    store = mockStore({ initialState });

    return store.dispatch(actions.deleteMovie(6)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

    it("should be error in deleting movie request", async () => {
      mock.mockRejectedValue("Movie not found"); 

      expectedActions = [{ type: types.FETCH_MOVIES_ERROR, error: "Movie not found" }];
      store = mockStore({ });

      return store.dispatch(actions.deleteMovie()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

  describe("Testing NEW_MOVIE", () => {
    let mock, expectedActions, store;

    beforeEach(() => {
      mock = jest.spyOn(axios, "post");
    });
    afterEach(() => {
      mock.mockRestore();
    });

    it("creates NEW_MOVIE when ready to add the movie", async () => {
      mock.mockResolvedValue(); // mock axios.post to resolve
      const movie = {
          title: "Toy Story",
          description:
            "O aniversário de Andy está chegando e os brinquedos estão nervosos. Afinal de contas, eles temem que um novo brinquedo possa substituí-los. Liderados por Woody, um caubói que é também o brinquedo predileto de Andy, eles montam uma escuta que lhes permite saber dos presentes ganhos. Entre eles está Buzz Lightyear, o boneco de um patrulheiro espacial, que logo passa a receber mais atenção do garoto. Isto aos poucos gera ciúmes em Woody, que tenta fazer com que ele caia atrás da cama. Só que o plano dá errado e Buzz cai pela janela. É o início da aventura de Woody, que precisa resgatar Buzz também para limpar sua barra com os outros brinquedos. ",
          watched: 1,
          platform: "disneyPlus",
          note: 5,
        },
        expectedActions = [{ type: types.NEW_MOVIES, payload: movie }];
      store = mockStore({ initialState });

      return store.dispatch(actions.createMovie(movie)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("should be error in add movie request", async () => {
     mock.mockRejectedValue("It wasn't possible to add the movie"); 

      const movie = {},
        expectedActions = [
          { type: types.FETCH_MOVIES_ERROR, error: "It wasn't possible to add the movie" },
        ];
      store = mockStore({ initialState });

      return store.dispatch(actions.createMovie(movie)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("Testing updateMovie", () => {
    let mock, expectedActions, store;

    beforeEach(() => {
      mock = jest.spyOn(axios, "put");
    });
    afterEach(() => {
      mock.mockRestore();
    });

    it("creates UPDATE_MOVIES when ready to add the movie", async () => {
      mock.mockResolvedValue(); // mock axios.post to resolve
      const movie = {
          title: "Toy Story 3",
          description:
            "O aniversário de Andy está chegando e os brinquedos estão nervosos. Afinal de contas, eles temem que um novo brinquedo possa substituí-los. Liderados por Woody, um caubói que é também o brinquedo predileto de Andy, eles montam uma escuta que lhes permite saber dos presentes ganhos. Entre eles está Buzz Lightyear, o boneco de um patrulheiro espacial, que logo passa a receber mais atenção do garoto. Isto aos poucos gera ciúmes em Woody, que tenta fazer com que ele caia atrás da cama. Só que o plano dá errado e Buzz cai pela janela. É o início da aventura de Woody, que precisa resgatar Buzz também para limpar sua barra com os outros brinquedos. ",
          watched: 0,
          platform: "netflix",
          note: 2,
          id: 7,
        },
        expectedActions = [{ type: types.UPDATE_MOVIES, payload: movie }];
      store = mockStore({ initialState });

      return store.dispatch(actions.updateMovie(movie)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("should be error in update movie request", async () => {
        mock.mockRejectedValue("It wasn't possible to update the movie"); 
   
         const movie = {},
           expectedActions = [
             { type: types.FETCH_MOVIES_ERROR, error: "It wasn't possible to update the movie" },
           ];
         store = mockStore({ initialState });
   
         return store.dispatch(actions.updateMovie(movie)).then(() => {
           expect(store.getActions()).toEqual(expectedActions);
         });
       });
  });

  describe("FETCH_MOVIES", () => {
    let mock, expectedActions, store;

    beforeEach(() => {
      mock = jest.spyOn(axios, "get");
    });
    afterEach(() => {
      mock.mockRestore();
    });

    it("creates FETCH_SUCCESS_MOVIES when ready to add the movie", async () => {
      mock.mockResolvedValue({ data: initialState }); // mock axios.post to resolve

      expectedActions = [
        { type: types.FETCH_MOVIES_PENDING },
        { type: types.FETCH_MOVIES_SUCCESS, payload: initialState },
      ];
      store = mockStore({});

      return store.dispatch(actions.fetchMovies()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("should be error when get movies request", async () => {
      mock.mockRejectedValue("Movies not found"); // mock axios.post to resolve

      expectedActions = [
        { type: types.FETCH_MOVIES_PENDING },
        { type: types.FETCH_MOVIES_ERROR, error: "Movies not found" },
      ];
      store = mockStore({});

      return store.dispatch(actions.fetchMovies()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
