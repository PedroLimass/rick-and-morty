import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import CardEpisode from "./";

const FALLBACK_IMAGE =
  "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

describe("<CardEpisode/>", () => {
  it("renderiza código, título e contagem de personagens", () => {
    render(
      <CardEpisode
        Id={1}
        Code="S01E01"
        Title="Pilot"
        DateEps="December 2, 2013"
        CharactersCount={19}
        imgLink="https://rickandmortyapi.com/api/character/avatar/435.jpeg"
      />
    );

    expect(screen.getByText("S01E01")).toBeInTheDocument();
    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(
      screen.getByText(/19 personagens neste episódio/i)
    ).toBeInTheDocument();
  });

  it("usa imagem de fallback quando imgLink está ausente", () => {
    render(<CardEpisode Id={2} Title="Lawnmower Dog" DateEps="December 9, 2013" />);

    const image = screen.getByRole("img", { name: /lawnmower dog/i });
    expect(image).toHaveAttribute("src", FALLBACK_IMAGE);
  });

  it("não mostra a contagem quando CharactersCount é indefinido", () => {
    render(<CardEpisode Id={3} Title="Anatomy Park" DateEps="December 16, 2013" />);

    expect(
      screen.queryByText(/personagens neste episódio/i)
    ).not.toBeInTheDocument();
  });
});
