import { render, screen, within } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import Header from "./";
import userEvent from "@testing-library/user-event";

describe("<Header/>", () => {
  it("Should Render diferente route", async () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    );

    expect(history.location.pathname).toBe("/");
    userEvent.click(screen.getByText(/personagens/i));
    expect(history.location.pathname).toBe("/characters");
  });
});
