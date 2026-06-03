import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { BrowserRouter } from "react-router-dom";
import FamousPlaces from "./";
import {
  getLocationsPage,
  getLocationFilterOptions,
} from "../../Services/locations";
import { getCharactersByIds } from "../../Services/characters";
import type { Character } from "../../types/rickAndMorty";
import { fakePlaces } from "../../mock/fakePlaces";
import { fakeEpsCharacter } from "../../mock/fakeEpisode";

vi.mock("../../Services/locations");
vi.mock("../../Services/characters");

beforeEach(() => {
  vi.mocked(getLocationsPage).mockResolvedValue(fakePlaces);
  vi.mocked(getCharactersByIds).mockResolvedValue(
    fakeEpsCharacter as unknown as Character[]
  );
  vi.mocked(getLocationFilterOptions).mockResolvedValue({
    types: ["Planet", "Space station"],
    dimensions: ["Dimension C-137", "unknown"],
  });
});

describe("<FamousPlaces/>", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should Render components", async () => {
    render(
      <BrowserRouter>
        <FamousPlaces />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { name: /lugares famosos de rick & morty/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /mostrar mais seta para baixo/i })
    ).toBeInTheDocument();
  });

  it("Should Render list with mock values", async () => {
    render(
      <BrowserRouter>
        <FamousPlaces />
      </BrowserRouter>
    );

    const placesList = await screen.findAllByText(/earth \(c\-137\)/i);

    expect(placesList[0]).toBeInTheDocument();
  });
});
