import AddForm from "../src/components/AddForm";
import { screen, fireEvent, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../test-utils";
import axios from "axios";

jest.mock("axios");

describe("Testing of AddForm.js", () => {
  it("should be submit the form with success", async () => {
    axios.post.mockResolvedValue();

    render(<AddForm />);

    const jsdomAlert = window.alert; // remember the jsdom alert
    window.alert = () => {};

    const input = screen.getByTestId("inputMovieName");
    const textArea = screen.getByTestId("inputDescription");
    const radio = screen.getByTestId("inputWatched");
    const select = screen.getByTestId("platform");
    const note = screen.getByTestId("note");

    fireEvent.change(input, { target: { value: "React Native" } });
    fireEvent.change(textArea, {
      target: { value: "Testing description of input" },
    });
    fireEvent.click(radio);
    fireEvent.change(select, { target: { value: "youtube" } });
    fireEvent.change(note, { target: { value: 3 } });

    fireEvent.click(screen.getByRole("button"));
    window.alert = jsdomAlert;
  });
  
  it("should  try to submit the form, but it will give an error because a field of description is empty", async () => {
    axios.post.mockResolvedValue();

    render(<AddForm />);

    const jsdomAlert = window.alert; // remember the jsdom alert
    window.alert = () => {};
    const input = screen.getByTestId("inputMovieName");
    const textArea = screen.getByTestId("inputDescription");
    const radio = screen.getByTestId("inputWatched");
    const select = screen.getByTestId("platform");
    const note = screen.getByTestId("note");

    fireEvent.change(input, { target: { value: "React Native" } });
    fireEvent.change(textArea, {
      target: { value: "" },
    });
    fireEvent.click(radio);
    fireEvent.change(select, { target: { value: "youtube" } });
    fireEvent.change(note, { target: { value: 3 } });

    fireEvent.click(screen.getByRole("button"));
    window.alert = jsdomAlert;
  });

  it("should try to send the form, but it will give an error when adding to the server", async () => {
    axios.post.mockRejectedValue("Erro while add the movie");

    render(<AddForm />);

    const jsdomAlert = window.alert; // remember the jsdom alert
    window.alert = () => {};
    const input = screen.getByTestId("inputMovieName");
    const textArea = screen.getByTestId("inputDescription");
    const radio = screen.getByTestId("inputWatched");
    const select = screen.getByTestId("platform");
    const note = screen.getByTestId("note");

    fireEvent.change(input, { target: { value: "React Native" } });
    fireEvent.change(textArea, {
      target: { value: "Description of movie" },
    });
    fireEvent.click(radio);
    fireEvent.change(select, { target: { value: "youtube" } });
    fireEvent.change(note, { target: { value: 3 } });

    fireEvent.click(screen.getByRole("button"));
    window.alert = jsdomAlert;
  });

  it("testing the radio button", async () => {
    render(<AddForm />);

    const watched = screen.getByTestId("inputWatched");
    const noWatched = screen.getByTestId("inputNoWatched");

    fireEvent.click(watched);
    fireEvent.click(noWatched);
    expect(watched.value).toBe("0");
    expect(noWatched.value).toBe("1");
  });

  it("testing the select platform", async () => {
    render(<AddForm />);

    const select = screen.getByTestId("platform");
    let options = screen.getAllByTestId("platform-option");

    fireEvent.change(select, { target: { value: "netflix" } });
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
});
