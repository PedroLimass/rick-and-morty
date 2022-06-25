import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";
import EpisodeList from "./";

import userEvent from "@testing-library/user-event";

describe("<EpisodeList/>", () => {
  it("Should Render static components", async () => {
    render(
      <BrowserRouter>
        <EpisodeList />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { name: /episódios/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Temporada 1" }).selected).toBe(
      true
    );
    expect(screen.getByRole("option", { name: "Temporada 2" }).selected).toBe(
      false
    );
    expect(screen.getByRole("option", { name: "Temporada 3" }).selected).toBe(
      false
    );
    expect(screen.getByRole("option", { name: "Temporada 4" }).selected).toBe(
      false
    );
  });

  it("Should season list", async () => {
    render(
      <BrowserRouter>
        <EpisodeList />
      </BrowserRouter>
    );

    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "Temporada 2" })
    );
    expect(screen.getByRole("option", { name: "Temporada 2" }).selected).toBe(
      true
    );
  });
});
