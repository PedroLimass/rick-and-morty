import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { BrowserRouter } from "react-router-dom";
import Home from "./";

describe("<Home/>", () => {
  it("Should Render information", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: /está preparado para navegar no mundo de rick and morty \?/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /rick and morty portal/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /iniciar aventura/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/©rickandmortyapi\.com/i)).toBeInTheDocument();
  });

  it("Should redirect", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const singleBtn = screen.getByRole("link", { name: /iniciar aventura/i });

    fireEvent.click(singleBtn);

    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() =>
      screen
        .getByRole("heading", { name: /buscar personagens/i })
        .toBeInTheDocument()
    );
  });
});
