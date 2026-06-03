import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, useLocation } from "react-router-dom";

import Header from "./";
import userEvent from "@testing-library/user-event";

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

describe("<Header/>", () => {
  it("Should navigate to a different route", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
        <LocationDisplay />
      </MemoryRouter>
    );

    expect(screen.getByTestId("location-display")).toHaveTextContent("/");

    await user.click(screen.getByText(/personagens/i));

    expect(screen.getByTestId("location-display")).toHaveTextContent(
      "/characters"
    );
  });
});
