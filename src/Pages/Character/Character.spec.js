import { render, screen, within } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";
import Character from "./";

import userEvent from "@testing-library/user-event";

describe("<Character/>", () => {
  it("Should Render static components", async () => {
    render(
      <BrowserRouter>
        <Character />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { name: /buscar personagens/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: /rick and morty portal/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /buscar personagens/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /gênero/i })).toBeInTheDocument();
  });

  it("Should change filter status", async () => {
    render(
      <BrowserRouter>
        <Character />
      </BrowserRouter>
    );
    const select = screen.getByRole("button", { name: /status/i });
    userEvent.click(select);
    const option = await screen.findByRole("option", { name: /alive/i });
    userEvent.click(option);
    const button = screen.getByRole("button", {
      name: /status/i,
    });

    expect(within(button).getByText(/alive/i)).toBeInTheDocument();
  });


  it("Should change filter gender", async () => {
    render(
      <BrowserRouter>
        <Character />
      </BrowserRouter>
    );
    const select = screen.getByRole("button", { name: /gênero/i });
    userEvent.click(select);
    const option = await screen.findByRole("option", { name: /female/i });
    userEvent.click(option);
    const button = screen.getByRole("button", {
      name: /gênero/i,
    });

    expect(within(button).getByText(/female/i)).toBeInTheDocument();
  });
});
