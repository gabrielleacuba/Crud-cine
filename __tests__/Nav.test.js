import Nav from "../src/components/Nav.js";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../test-utils";
import axios from "axios";

jest.mock("next/link", () => {
  return ({ children }) => {
    return children;
  };
});

describe("Testing of props the Nav.js", () => {
    it("should be render a Nav", async () => {
      render(<Nav />);
    });
  });