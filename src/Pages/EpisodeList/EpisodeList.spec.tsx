import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { BrowserRouter } from "react-router-dom";
import EpisodeList from "./";
import { getAllEpisodes } from "../../Services/episodes";
import { getCharactersByIds } from "../../Services/characters";
import type { Episode } from "../../types/rickAndMorty";

import userEvent from "@testing-library/user-event";

const makeEpisode = (overrides: Partial<Episode>): Episode => ({
  id: 1,
  name: "Pilot",
  air_date: "December 2, 2013",
  episode: "S01E01",
  characters: ["https://rickandmortyapi.com/api/character/1"],
  url: "https://rickandmortyapi.com/api/episode/1",
  created: "2017-11-10T12:56:33.798Z",
  ...overrides,
});

vi.mock("../../Services/episodes");
vi.mock("../../Services/characters");

beforeEach(() => {
  vi.mocked(getAllEpisodes).mockResolvedValue([]);
  vi.mocked(getCharactersByIds).mockResolvedValue([]);
});

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

    const optionSelected = (name: string) =>
      (screen.getByRole("option", { name }) as HTMLOptionElement).selected;

    expect(optionSelected("Temporada 1")).toBe(true);
    expect(optionSelected("Temporada 2")).toBe(false);
    expect(optionSelected("Temporada 3")).toBe(false);
    expect(optionSelected("Temporada 4")).toBe(false);
  });

  it("Should season list", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <EpisodeList />
      </BrowserRouter>
    );

    await user.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "Temporada 2" })
    );
    expect(
      (screen.getByRole("option", { name: "Temporada 2" }) as HTMLOptionElement)
        .selected
    ).toBe(true);
  });

  it("filtra os episódios pela barra de busca", async () => {
    const user = userEvent.setup();
    vi.mocked(getAllEpisodes).mockResolvedValue([
      makeEpisode({ id: 1, name: "Pilot", episode: "S01E01" }),
      makeEpisode({ id: 2, name: "Lawnmower Dog", episode: "S01E02" }),
    ]);

    render(
      <BrowserRouter>
        <EpisodeList />
      </BrowserRouter>
    );

    expect(await screen.findByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("Lawnmower Dog")).toBeInTheDocument();

    await user.type(
      screen.getByRole("textbox", { name: /buscar episódio/i }),
      "lawn"
    );

    await waitFor(() => {
      expect(screen.queryByText("Pilot")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Lawnmower Dog")).toBeInTheDocument();
  });
});
