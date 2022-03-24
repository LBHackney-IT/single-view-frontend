import { renderHook } from "@testing-library/react-hooks";
import MatchMediaMock from "jest-matchmedia-mock";

import {
  BreakpointKey,
  queries,
  useBreakpoint,
  useBreakpointValue,
} from "../use-breakpoint";

let matchMedia: MatchMediaMock;

beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterEach(() => {
  matchMedia.clear();
});

describe("useBreakpoint", () => {
  test("it returns undefined with no matching breakpoint", () => {
    matchMedia.useMediaQuery(`(min-width: 0px)`);
    const { result } = renderHook(() => useBreakpoint("test" as BreakpointKey));
    expect(result.current).toBe(undefined);
  });

  test("it returns a true on the matching breakpoint", () => {
    matchMedia.useMediaQuery(queries.base);
    const { result } = renderHook(() => useBreakpoint("base"));
    expect(result.current).toBe(true);
  });
});

describe("useBreakpointValue", () => {
  test("it returns matching value on breakpoint", () => {
    matchMedia.useMediaQuery(queries.base);
    const { result } = renderHook(() =>
      useBreakpointValue({ base: "hello", lg: "world" }),
    );
    expect(result.current).toBe("hello");
  });

  test("it returns best matching value on breakpoint", () => {
    matchMedia.useMediaQuery(queries.md);
    const { result } = renderHook(() =>
      useBreakpointValue({ base: "hello", lg: "world" }),
    );
    expect(result.current).toBe("hello");
  });

  test("it returns undefined if there is no matching breakpoint", () => {
    matchMedia.useMediaQuery(queries.lg);
    const { result } = renderHook(() =>
      useBreakpointValue({ test: "hello" } as Partial<Record<BreakpointKey, string>>),
    );
    expect(result.current).toBe(undefined);
  });
});
