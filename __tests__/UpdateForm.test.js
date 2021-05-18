import UpdateForm from "../src/components/UpdateForm";
import { screen, fireEvent, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../test-utils";
import axios from "axios";

// beforeEach(() => {
//   jest.resetAllMocks();
// });

// afterEach(() => {
//   cleanup();
// });

jest.mock("axios");

const movie = {
  title: "Vingadores: Ultimato",
  description:
    "Em Vingadores: Ultimato, após Thanos eliminar metade das criaturas vivas em Vingadores: Guerra Infinita, os heróis precisam lidar com a dor da perda de amigos e seus entes queridos. Com Tony Stark (Robert Downey Jr.) vagando perdido no espaço sem água nem comida, o Capitão América/Steve Rogers (Chris Evans) e a Viúva Negra/Natasha Romanov (Scarlett Johansson) precisam liderar a resistência contra o titã louco.",
  watched: 0,
  platform: "netflix",
  note: 5,
  id: 6,
};

describe("Testing of Update.js", () => {
  it("should be changed filed of title value and submit the form with sucess", async () => {
    axios.put.mockResolvedValue();
    render(<UpdateForm movie={movie} />);

    const jsdomAlert = window.alert; // remember the jsdom alert
    window.alert = () => {};

    const input = screen.getByTestId("inputMovieName");

    expect(input.value).toBe("Vingadores: Ultimato");

    fireEvent.change(input, { target: { value: "Harry Potter" } });

    expect(input.value).toBe("Harry Potter");

    const itemButton = screen.getByTestId("button");
    await fireEvent.click(itemButton);
    window.alert = jsdomAlert;

    expect(input.value).toBe("");
  });

  it("should be changed filed of description value and submit the form with sucess", async () => {
    axios.put.mockResolvedValue();
    render(<UpdateForm movie={movie} />);

    const jsdomAlert = window.alert; // remember the jsdom alert
    window.alert = () => {};

    const description = screen.getByTestId("inputDescription");

    expect(description.value).toBe(
      "Em Vingadores: Ultimato, após Thanos eliminar metade das criaturas vivas em Vingadores: Guerra Infinita, os heróis precisam lidar com a dor da perda de amigos e seus entes queridos. Com Tony Stark (Robert Downey Jr.) vagando perdido no espaço sem água nem comida, o Capitão América/Steve Rogers (Chris Evans) e a Viúva Negra/Natasha Romanov (Scarlett Johansson) precisam liderar a resistência contra o titã louco."
    );

    fireEvent.change(description, {
      target: {
        value:
          "Changing the description for testing the update form  on tests with jest",
      },
    });

    expect(description.value).toBe(
      "Changing the description for testing the update form  on tests with jest"
    );

    const itemButton = screen.getByTestId("button");
    await fireEvent.click(itemButton);
    window.alert = jsdomAlert;

    expect(description.value).toBe("");
  });
  it("testing the radio button", async () => {
    render(<UpdateForm movie={movie} />);

    const watched = screen.getByTestId("inputWatched");
    const noWatched = screen.getByTestId("inputNoWatched");
    expect(watched.value).toBe("0");

    fireEvent.click(noWatched);
    expect(noWatched.value).toBe("1");

    fireEvent.click(watched);
    expect(watched.value).toBe("0");
  });

  it("testing the select platform", async () => {
    render(<UpdateForm movie={movie} />);

    const select = screen.getByTestId("platform");
    let options = screen.getAllByTestId("platform-option");

    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();

    fireEvent.change(select, { target: { value: "disneyPlus" } });
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();

    fireEvent.change(select, { target: { value: "amazonPrime" } });
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();

    fireEvent.change(select, { target: { value: "youtube" } });
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeTruthy();
  });

  it("testing the select note", async () => {
    render(<UpdateForm movie={movie} />);

    const note = screen.getByTestId("note");
    let options = screen.getAllByTestId("note-option");

    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeTruthy();

    fireEvent.change(note, { target: { value: 1 } });
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeFalsy();
  });

  it("should  try to submit the update form, but it will give an error because a field of title is empty", async () => {
    axios.put.mockResolvedValue();

    render(<UpdateForm movie={movie} />);

    const jsdomAlert = window.alert; // remember the jsdom alert
    window.alert = () => {};

    const title = screen.getByTestId("inputMovieName");
    const select = screen.getByTestId("platform");
    const note = screen.getByTestId("note");

    fireEvent.change(title, { target: { value: "" } });
    fireEvent.change(select, { target: { value: "youtube" } });
    fireEvent.change(note, { target: { value: 3 } });

    fireEvent.click(screen.getByRole("button"));
    window.alert = jsdomAlert;
  });
});
