import reducer from "../src/redux/reducers/movieReducer";
import * as types from "../src/redux/actions/types";

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

describe("Movie reducer", () => {
  it("should return the initial state", () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual({
      items: [],
      item: {},
      pending: false,
      error: null,
    });
  });

  it("should add a new movie in case NEW_MOVIES", () => {
    const item = {
      title: "Harry Potter",
      description: "values.movieDescription",
      watched: 1,
      platform: "netflix",
      note: 5,
    };

    const addItem = reducer(undefined, {
      type: types.NEW_MOVIES,
      payload: item,
    });

    expect(addItem).toEqual({
      items: [],
      item: {
        title: "Harry Potter",
        description: "values.movieDescription",
        watched: 1,
        platform: "netflix",
        note: 5,
      },
      pending: false,
      error: null,
    });
  });

  it("should delete a movie in case DELETE_MOVIE", () => {
    const deleteItem = reducer(initialState, {
      type: types.DELETE_MOVIES,
      payload: 7,
    });

    expect(deleteItem).toEqual({
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
      ],
      item: {},
      pending: false,
      error: null,
    });
  });

  it("should update of movie in case UPDATE_MOVIES", () => {
    const item = {
      title: "Vingadores: Ultimato Update Teste",
      description: "testando",
      watched: 0,
      platform: "netflix",
      note: 5,
      id: 6,
    };
    const updateItem = reducer(initialState, {
      type: types.UPDATE_MOVIES,
      payload: item,
    });

    expect(updateItem).toEqual({
      items: [
        {
          title: "Vingadores: Ultimato Update Teste",
          description: "testando",
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
    });
  });

  it("should start the search event", () => {
    const fetchMoviesPending = reducer(undefined, {
      type: types.FETCH_MOVIES_PENDING,
    });

    expect(fetchMoviesPending).toEqual({
      items: [],
      item: {},
      pending: true,
      error: null,
    });
  });

  it("should return the data if the search for that right", () => {
    const search = [
      {
        title: "Vingadores: Ultimato Update Teste",
        description: "testando busca",
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
    ];
    const fetchMoviesSuccess = reducer(undefined, {
      type: types.FETCH_MOVIES_SUCCESS,
      payload: search,
    });

    expect(fetchMoviesSuccess).toEqual({
      items: [
        {
          title: "Vingadores: Ultimato Update Teste",
          description: "testando busca",
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
    });
  });
  it("should return the data if the search for that right", () => {

    const fetchMoviesError= reducer(undefined, {
      type: types.FETCH_MOVIES_ERROR,
      error: true,
    });

    expect(fetchMoviesError).toEqual({
      items: [],
      item: {},
      pending: false,
      error: true,
    });
  });
});
