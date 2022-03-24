import { act, renderHook } from "@testing-library/react-hooks";

import { $configuration } from "../../configuration";
import { useConfiguration } from "../use-configuration";

describe("useConfiguration", () => {
  beforeEach(() => {
    $configuration.next({});
  });

  test("it returns an empty string for when no configuration is found", () => {
    const { result } = renderHook(() => useConfiguration("MMH.TestConfig"));
    expect(result.current).toBe("");
  });

  test("it returns the correct configuratio value", () => {
    $configuration.next({
      MMH: {
        configuration: {
          TestConfig: "TestConfigString",
        },
        featureToggles: {},
      },
    });
    const { result } = renderHook(() => useConfiguration("MMH.TestConfig"));
    expect(result.current).toBe("TestConfigString");
  });

  test("it listens to updated on configuration", () => {
    $configuration.next({
      MMH: {
        configuration: {},
        featureToggles: {},
      },
    });
    const { result } = renderHook(() => useConfiguration("MMH.TestConfig"));
    expect(result.current).toBe("");

    act(() => {
      $configuration.next({
        MMH: {
          configuration: {
            TestConfig: "TestConfigString",
          },
          featureToggles: {},
        },
      });
    });

    expect(result.current).toBe("TestConfigString");
  });
});
