import React, {
  Dispatch,
  FC,
  Reducer,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

export interface PageAnnouncementState {
  heading: string;
  description?: string;
  variant?: "success" | "warning" | "info";
}

export type PageAnnouncementActions =
  | {
      type: "ADD";
      payload: PageAnnouncementState;
    }
  | { type: "CLEAR" };

export interface PageAnnouncementContextState {
  state?: PageAnnouncementState;
  dispatch: Dispatch<PageAnnouncementActions>;
}

export const PageAnnouncementContext = createContext<
  PageAnnouncementContextState | undefined
>(undefined);
PageAnnouncementContext.displayName = "PageAnnouncementContext";

interface UsePageAnnouncementValue {
  state?: PageAnnouncementState;
  addAnnouncement: Dispatch<PageAnnouncementState>;
  clearAnnouncement: Dispatch<void>;
}

export const usePageAnnouncement = (): UsePageAnnouncementValue => {
  const context = useContext(PageAnnouncementContext);

  if (!context) {
    const error = new Error(
      "usePageAnnouncementContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    );
    Error.captureStackTrace?.(error, usePageAnnouncement);
    throw error;
  }

  const { state, dispatch } = context;

  const addAnnouncement = useCallback(
    (props: PageAnnouncementState) => {
      dispatch({ type: "ADD", payload: props });
    },
    [dispatch],
  );

  const clearAnnouncement = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, [dispatch]);

  return {
    state,
    addAnnouncement,
    clearAnnouncement,
  };
};

interface PageAnnouncementProviderProps {
  sessionKey?: string;
}

export const PageAnnouncementProvider: FC<PageAnnouncementProviderProps> = ({
  sessionKey,
  children,
}): JSX.Element => {
  const reducer: Reducer<PageAnnouncementState | undefined, PageAnnouncementActions> = (
    state,
    action,
  ) => {
    switch (action.type) {
      case "ADD":
        return action.payload;
      case "CLEAR":
      default:
        return undefined;
    }
  };

  const initialData = useMemo(() => {
    if (sessionKey) {
      const data = {
        heading: window.sessionStorage.getItem(`${sessionKey}:heading`) || "",
        variant:
          (window.sessionStorage.getItem(
            `${sessionKey}:variant`,
          ) as PageAnnouncementState["variant"]) || "success",
        description: window.sessionStorage.getItem(`${sessionKey}:description`) || "",
      };

      if (data.heading) {
        window.sessionStorage.removeItem(`${sessionKey}:heading`);
        window.sessionStorage.removeItem(`${sessionKey}:variant`);
        window.sessionStorage.removeItem(`${sessionKey}:description`);
        return data;
      }
    }
    return undefined;
  }, [sessionKey]);

  const [state, dispatch] = useReducer(reducer, initialData);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <PageAnnouncementContext.Provider value={value}>
      {children}
    </PageAnnouncementContext.Provider>
  );
};
