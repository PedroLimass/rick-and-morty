import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

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

    expect(
      screen.getByRole("combobox", { name: /gênero/i })
    ).toBeInTheDocument();
  });

  it("Should change filter status", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Character />
      </BrowserRouter>
    );
    const select = screen.getByRole("combobox", { name: /status/i });
    await user.click(select);
    const option = await screen.findByRole("option", { name: /vivo/i });
    await user.click(option);

    expect(
      screen.getByRole("combobox", { name: /status/i })
    ).toHaveTextContent(/vivo/i);
  });

  it("Should change filter gender", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Character />
      </BrowserRouter>
    );
    const select = screen.getByRole("combobox", { name: /gênero/i });
    await user.click(select);
    const option = await screen.findByRole("option", { name: /feminino/i });
    await user.click(option);

    expect(
      screen.getByRole("combobox", { name: /gênero/i })
    ).toHaveTextContent(/feminino/i);
  });
});
