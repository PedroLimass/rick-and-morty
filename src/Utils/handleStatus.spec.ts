import { describe, it, expect } from "vitest";
import { handleStatus } from "./handleStatus";

describe("handleStatus", () => {
  it("mapeia 'Alive' para verde", () => {
    expect(handleStatus("Alive")).toBe("green");
  });

  it("mapeia 'Dead' para vermelho", () => {
    expect(handleStatus("Dead")).toBe("red");
  });

  it("mapeia 'unknown' para amarelo", () => {
    expect(handleStatus("unknown")).toBe("yellow");
  });

  it("retorna undefined para valores desconhecidos", () => {
    expect(handleStatus("qualquer")).toBeUndefined();
    expect(handleStatus()).toBeUndefined();
  });
});
