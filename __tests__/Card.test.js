import Card from "../src/components/Card.js";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../test-utils";
import axios from "axios";

jest.mock("next/link", () => {
  return ({ children }) => {
    return children;
  };
});

jest.mock("axios");

const props = [
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
  {
    title: "X-men",
    description:
      "Em um futuro próximo há pessoas que são o próximo degrau na escada evolucionária humana, os mutantes. Dotados de um fator X em sua carga genética, cada mutante desenvolve um tipo diferente de poder e muitas vezes precisam aprender a controlá-lo, pois só se manifesta na adolescência ou mesmo quando se tornam adultos. Os mutantes sofrem um grande preconceito, pois os humanos em geral não entendem os poderes deles e temem que os mutantes, por serem superiores às pessoas comuns, irão perseguir a raça humana. Do lado dos mutantes, o combate a esse preconceito não acontece de modo uniforme. Alguns mutantes, os X-Men, são liderados pelo Professor Xavier (Patrick Stewart), um telepata, e pretendem vencer o preconceito por meios pacíficos, convencendo o público de que humanos e mutantes podem conviver em paz. No entanto a Irmandade dos Mutantes, comandada pelo temível Magneto (Ian McKellen), que pode alterar e modificar a estrutura dos metais, declarou guerra aos humanos, pois está cansado de tanta perseguição e humilhação. O ódio e o medo que os humanos sentem pelos mutantes está à beira do fanatismo, principalmente por causa de uma campanha antimutantes liderada pelo senador Robert Kelly (Bruce Davison). Particularmente dois mutantes serão envolvidos nesta luta: o primeiro é Wolverine (Hugh Jackman) que, dotado de incrível força, não lembra do seu passado; e o segundo éVampira (Anna Paquim), uma jovem que absorve toda a força vital de qualquer pessoa que ela toque, sendo que se o contato for um pouco prolongado esta pessoa morrerá. Estes dois mutantes são disputados pela Irmandade dos Mutantes e pelos X-Men, pois cada facção quer fortalecer seu lado. A diferença é que Xavier quer os mutantes para também ajudá-los a compreender e controlar seus poderes, enquanto Magneto precisa dos dois, Vampira em especial, para levar a cabo o plano de atingir os líderes mundiais, que pretendem decidir o futuro dos mutantes na Ilha de Ellis, Nova York.",
    watched: 1,
    platform: "disneyPlus",
    note: 3,
    id: 8,
  },
  {
    title: "Star Wars",
    description:
      "Em Guerra nas Estrelas, o jovem Luke Skywalker (Mark Hamill) sonha ir para a Academia como seus amigos, mas se vê envolvido em uma guerra intergalática quando seu tio compra dois robôs e com eles encontra uma mensagem da princesa Leia Organa (Carrie Fisher) para o Jedi Obi-Wan Kenobi (Alec Guinness) sobre os planos da construção da Estrela da Morte, uma gigantesca estação espacial com capacidade para destruir um planeta. Luke então se junta aos cavaleiros Jedi e a Han Solo (Harrison Ford), um mercenário, para tentar destruir esta terrível ameaça ao lado dos membros da resistência.",
    watched: 0,
    platform: "amazonPrime",
    note: 4,
    id: 9,
  },
];

describe("Testing of Card.js", () => {
  it("should be a render of Card with the platform netflix option watched and title", async () => {
    render(
      <Card
        title={props[0].title}
        description={props[0].description}
        watched={props[0].watched}
        platform={props[0].platform}
        note={props[0].note}
        id={props[0].id}
      />
    );

    expect(screen.getByText("Vingadores: Ultimato")).toBeInTheDocument();
  });

  it("should be a render of Card with the platform youtube option no watched and title", () => {
    render(
      <Card
        title={props[1].title}
        description={props[1].description}
        watched={props[1].watched}
        platform={props[1].platform}
        note={props[1].note}
        id={props[1].id}
      />
    );

    expect(screen.getByText("Anne with an e")).toBeInTheDocument();
  });

  it("should be a render of Card with the platform amazon-prime option watched and description", () => {
    render(
      <Card
        title={props[3].title}
        description={props[3].description}
        watched={props[3].watched}
        platform={props[3].platform}
        note={props[3].note}
        id={props[3].id}
      />
    );

    expect(
      screen.getByText(
        "Em Guerra nas Estrelas, o jovem Luke Skywalker (Mark Hamill) sonha ir para a Academia como seus amigos, mas se vê envolvido em uma guerra intergalática quando seu tio compra dois robôs e com eles encontra uma mensagem da princesa Leia Organa (Carrie Fisher) para o Jedi Obi-Wan Kenobi (Alec Guinness) sobre os planos da construção da Estrela da Morte, uma gigantesca estação espacial com capacidade para destruir um planeta. Luke então se junta aos cavaleiros Jedi e a Han Solo (Harrison Ford), um mercenário, para tentar destruir esta terrível ameaça ao lado dos membros da resistência."
      )
    ).toBeInTheDocument();
  });

  it("should be a render of Card with the platform disney+ option no watched and testing button delete", () => {
    const randomFactText = "Random fact";
    axios.delete.mockResolvedValue({ data: randomFactText, idMovie: 8 });

    render(
      <Card
        title={props[2].title}
        description={props[2].description}
        watched={props[2].watched}
        platform={props[2].platform}
        note={props[2].note}
        id={props[2].id}
      />
    );

    const itemButton = screen.getByTestId("btn-delete");
    fireEvent.click(itemButton);
  });
});
