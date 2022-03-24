import useMediaBreakpoint from "use-breakpoint";

export const BREAKPOINTS = {
  base: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1280,
  "2xl": 1536,
};

export const queries = {
  base: "(min-width: 0px) and (max-width: 479px)",
  sm: "(min-width: 480px) and (max-width: 767px)",
  md: "(min-width: 768px) and (max-width: 991px)",
  lg: "(min-width: 992px) and (max-width: 1279px)",
  xl: "(min-width: 1280px) and (max-width: 1535px)",
  "2xl": "(min-width: 1536px)",
};

const breakpoints = new Map(Object.entries(BREAKPOINTS));

export type BreakpointKey = keyof typeof BREAKPOINTS;

export const useBreakpoint = (
  breakpoint: BreakpointKey,
  defaultBreakpoint?: BreakpointKey,
): boolean | undefined => {
  const { minWidth } = useMediaBreakpoint(BREAKPOINTS, defaultBreakpoint);
  const point = breakpoints.get(breakpoint);
  if (point !== undefined) {
    return minWidth >= point;
  }
  return undefined;
};

export const useBreakpointValue = <T>(
  breakpointRecord: Partial<Record<BreakpointKey, T>>,
  defaultBreakpoint?: BreakpointKey,
): T | undefined => {
  const { minWidth, breakpoint } = useMediaBreakpoint(BREAKPOINTS, defaultBreakpoint);
  const valueKeys = Object.keys(breakpointRecord) as BreakpointKey[];
  const index = valueKeys.indexOf(breakpoint);
  if (index !== -1) {
    return breakpointRecord[`${breakpoint}` as BreakpointKey];
  }

  let maxPointMatch = 0;
  let keyMatch: BreakpointKey | null = null;

  for (let i = 0; i < valueKeys.length; i += 1) {
    const key = valueKeys[Number(i)];
    const point = breakpoints.get(key);
    if (point !== undefined && minWidth >= point && maxPointMatch <= point) {
      maxPointMatch = point;
      keyMatch = key;
    }
  }

  if (keyMatch) {
    return breakpointRecord[`${keyMatch}` as BreakpointKey];
  }

  return undefined;
};
