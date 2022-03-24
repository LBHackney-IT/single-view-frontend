import React, { ReactNode, createContext, useCallback, useMemo, useState } from "react";

export interface Booleans {
  [key: string]: boolean;
}

export interface BooleanContextProviderProps {
  children: ReactNode;
  initialValue?: Booleans;
}

export const BooleanContext = createContext<{
  booleans: Booleans;
  setBooleans: (booleans: Booleans) => void;
}>({ booleans: {}, setBooleans: () => {} });

export const BooleanContextProvider = ({
  children,
  initialValue = {},
}: BooleanContextProviderProps) => {
  const [booleans, setBooleansState] = useState(initialValue);
  const setBooleans = useCallback(
    (newBooleans: Booleans) =>
      setBooleansState((current) => ({ ...current, ...newBooleans })),
    [setBooleansState],
  );
  const value = useMemo(() => ({ booleans, setBooleans }), [booleans, setBooleans]);

  return <BooleanContext.Provider value={value}>{children}</BooleanContext.Provider>;
};
