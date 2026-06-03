import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import CardLocation from "./";

const FALLBACK_IMAGE =
  "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

describe("<CardLocation/>", () => {
  it("renderiza o nome e limpa o prefixo 'Dimension' da dimensão", () => {
    render(
      <CardLocation
        Title="Earth (C-137)"
        SubTitle="Dimension C-137"
        imgLink="https://rickandmortyapi.com/api/character/avatar/38.jpeg"
      />
    );

    expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
    expect(screen.getByText(/dimensão: c-137/i)).toBeInTheDocument();
  });

  it("usa imagem de fallback quando imgLink está ausente", () => {
    render(<CardLocation Title="Abadango" SubTitle="unknown" />);

    const image = screen.getByRole("img", { name: /abadango/i });
    expect(image).toHaveAttribute("src", FALLBACK_IMAGE);
  });
});
