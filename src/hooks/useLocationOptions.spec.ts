import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { useLocationOptions } from "./useLocationOptions";
import { getLocationFilterOptions } from "../Services/locations";

vi.mock("../Services/locations");

beforeEach(() => {
  vi.mocked(getLocationFilterOptions).mockReset();
});

describe("useLocationOptions", () => {
  it("retorna as opções carregadas da API", async () => {
    vi.mocked(getLocationFilterOptions).mockResolvedValue({
      types: ["Planet"],
      dimensions: ["Dimension C-137"],
    });

    const { result } = renderHook(() => useLocationOptions());

    await waitFor(() => expect(result.current.types).toHaveLength(1));
    expect(result.current.dimensions).toEqual(["Dimension C-137"]);
  });

  it("mantém opções vazias quando a busca falha", async () => {
    vi.mocked(getLocationFilterOptions).mockRejectedValue(new Error("falha"));

    const { result } = renderHook(() => useLocationOptions());

    await waitFor(() => {
      expect(getLocationFilterOptions).toHaveBeenCalled();
    });
    expect(result.current.types).toEqual([]);
    expect(result.current.dimensions).toEqual([]);
  });
});
