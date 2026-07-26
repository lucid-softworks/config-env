import { describe, expect, it } from "vitest";

import { environmentConfigSource } from "../src/index.js";

describe("environmentConfigSource", () => {
  it("maps defined values into nested config paths", () => {
    const source = environmentConfigSource(
      { HOST: "example.test", PORT: "3000", UNUSED: undefined },
      {
        "server.host": "HOST",
        "server.port": "PORT",
        unused: "UNUSED",
      },
      { name: "env" },
    );
    expect(source.load()).toMatchObject({
      name: "env",
      values: {
        server: { host: "example.test", port: "3000" },
      },
    });
  });

  it("can treat empty strings as missing", () => {
    expect(
      environmentConfigSource(
        { EMPTY: "" },
        { value: "EMPTY" },
        { emptyAsMissing: true },
      ).load(),
    ).toMatchObject({ name: "environment", values: {} });
    expect(
      environmentConfigSource({ EMPTY: "" }, { value: "EMPTY" }).load(),
    ).toMatchObject({ values: { value: "" } });
  });

  it("rejects empty path segments", () => {
    const source = environmentConfigSource({ VALUE: "x" }, { "a..b": "VALUE" });
    expect(() => source.load()).toThrow("Invalid config path");
  });
});
