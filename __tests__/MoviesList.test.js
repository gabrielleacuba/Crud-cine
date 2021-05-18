import MoviesList from "../src/components/MoviesList.js";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../test-utils";
import axios from "axios";

describe("Testing of props the MoviesList.js", () => {
  it("should render MoviesList", async () => {
    render(<MoviesList />);
  });
});
