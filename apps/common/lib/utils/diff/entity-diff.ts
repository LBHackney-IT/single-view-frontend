import { diff } from "deep-diff";

export const entityDiff = <T extends Record<string, any>>(lhs: T, rhs: T): Partial<T> => {
  const deepDiff = diff(lhs, rhs) || [];
  return deepDiff.reduce((acc, change) => {
    const [path] = change.path as any[];
    acc[path as keyof T] = rhs[path] || null;
    return acc;
  }, {} as Partial<T>);
};
