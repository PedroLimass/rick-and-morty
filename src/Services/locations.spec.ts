import { describe, it, expect, beforeEach, vi } from "vitest";

import api from "./index";
import { getLocationsPage, getLocationFilterOptions } from "./locations";

vi.mock("./index", () => ({ default: { get: vi.fn() } }));

const mockedGet = vi.mocked(api.get);

beforeEach(() => {
  mockedGet.mockReset();
});

describe("getLocationsPage", () => {
  it("envia a página e ignora filtros vazios", async () => {
    mockedGet.mockResolvedValue({ data: { info: {}, results: [] } });

    await getLocationsPage(2, { name: "earth", type: "", dimension: "" });

    expect(mockedGet).toHaveBeenCalledWith(
      "/location",
      expect.objectContaining({ params: { page: 2, name: "earth" } })
    );
  });
});

describe("getLocationFilterOptions", () => {
  it("deriva tipos/dimensões distintos e ordenados, com cache", async () => {
    mockedGet.mockImplementation((_url: string, config?: { params?: { page?: number } }) => {
      const page = config?.params?.page ?? 1;
      if (page === 1) {
        return Promise.resolve({
          data: {
            info: { pages: 2 },
            results: [
              { type: "Planet", dimension: "Dimension C-137" },
              { type: "unknown", dimension: "" },
            ],
          },
        });
      }
      return Promise.resolve({
        data: {
          info: { pages: 2 },
          results: [{ type: "Planet", dimension: "Replacement Dimension" }],
        },
      });
    });

    const options = await getLocationFilterOptions();

    expect(options.types).toEqual(["Planet", "unknown"]);
    expect(options.dimensions).toEqual([
      "Dimension C-137",
      "Replacement Dimension",
    ]);

    const callsAfterFirst = mockedGet.mock.calls.length;
    await getLocationFilterOptions();
    expect(mockedGet.mock.calls.length).toBe(callsAfterFirst);
  });
});
