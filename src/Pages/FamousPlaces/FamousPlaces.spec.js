/* eslint-disable testing-library/await-async-utils */
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";
import FamousPlaces from "./";
import { fakePlaces } from "../../mock/fakePlaces";
import { fakeEpsCharacter } from "../../mock/fakeEpisode";



beforeEach(() => {
  jest.mock("axios");
  axios.get = jest.fn().mockResolvedValue({ data: fakePlaces });
  axios.get = jest.fn().mockResolvedValue({ data: fakeEpsCharacter });
});

describe("<FamousPlaces/>", () => {
  afterEach(() => {
    jest.restoreAllMocks();
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
      screen.getByRole("button", { name: /mostrar mais seta para baixo/i })
    ).toBeInTheDocument();
  });

  it("Should Render list with mock values", async () => {
    axios.get.mockResolvedValue({ data: fakePlaces });
    axios.get.mockResolvedValue({ data: fakeEpsCharacter });

    render(
      <BrowserRouter>
        <FamousPlaces />
      </BrowserRouter>
    );

    const placesList = await screen.findAllByText(/earth \(c\-137\)/i);

    expect(placesList[0]).toBeInTheDocument();
  });
});
