import { describe, it, expect, beforeEach, vi } from "vitest";

import api from "./index";
import { getAllEpisodes } from "./episodes";

vi.mock("./index", () => ({ default: { get: vi.fn() } }));

const mockedGet = vi.mocked(api.get);

beforeEach(() => {
  mockedGet.mockReset();
});

describe("getAllEpisodes", () => {
  it("busca a primeira página e as demais em paralelo", async () => {
    mockedGet.mockImplementation((url: string) => {
      if (url === "/episode") {
        return Promise.resolve({
          data: { info: { pages: 2 }, results: [{ id: 1, name: "Pilot" }] },
        });
      }
      return Promise.resolve({
        data: { info: { pages: 2 }, results: [{ id: 21, name: "Outro" }] },
      });
    });

    const result = await getAllEpisodes();

    expect(result).toHaveLength(2);
    expect(result.map((e) => e.id)).toEqual([1, 21]);
    expect(mockedGet).toHaveBeenCalledWith("/episode", expect.anything());
    expect(mockedGet).toHaveBeenCalledWith(
      "/episode?page=2",
      expect.anything()
    );
  });

  it("não faz requisições extras quando há apenas uma página", async () => {
    mockedGet.mockResolvedValue({
      data: { info: { pages: 1 }, results: [{ id: 1, name: "Pilot" }] },
    });

    const result = await getAllEpisodes();

    expect(result).toHaveLength(1);
    expect(mockedGet).toHaveBeenCalledTimes(1);
  });
});
