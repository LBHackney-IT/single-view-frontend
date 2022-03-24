import { request } from "@hackney/mtfh-test-utils";

import {
  $configuration,
  getConfiguration,
  getFeatureToggle,
  hydrateConfiguration,
} from "./configuration";

beforeEach(() => {
  $configuration.next({});
  window.localStorage.removeItem("features");
});

test("configuration is set from instatiation", () => {
  expect(getFeatureToggle("MMH.Test")).toBe(false);
});

test("configuration is hydrated from localStorage", () => {
  window.localStorage.setItem(
    "features",
    JSON.stringify({
      MMH: { featureToggle: { Test: true }, configuration: { TestConfig: "Hello" } },
    }),
  );
  const features = hydrateConfiguration();
  expect(features).toStrictEqual({
    MMH: { configuration: { TestConfig: "Hello" }, featureToggle: { Test: true } },
  });
});

test("configuration not hydrated if localStorage is malformed", async () => {
  window.localStorage.setItem("features", JSON.stringify("Invalid String"));
  const features = hydrateConfiguration();
  expect(features).toStrictEqual({});
});

test("configuration is hydrated from api", async () => {
  request({
    method: "get",
    data: [
      {
        type: "MMH",
        configuration: { TestConfig: "TestConfig" },
        featureToggles: { Test: true },
      },
    ],
    path: "/api/v1/configuration",
  });
  await getConfiguration();
  const configs = $configuration.getValue();
  expect(configs).toStrictEqual({
    MMH: { configuration: { TestConfig: "TestConfig" }, featureToggles: { Test: true } },
  });
});

test("configuration is persisted to localStorage on success", async () => {
  request({
    method: "get",
    data: [
      {
        type: "MMH",
        configuration: { TestConfig: "TestConfig" },
        featureToggles: { Test: true },
      },
    ],
    path: "/api/v1/configuration",
  });
  await getConfiguration();
  expect(window.localStorage.getItem("features")).toContain('"Test":true');
  expect(window.localStorage.getItem("features")).toContain('"TestConfig":"TestConfig"');
});
