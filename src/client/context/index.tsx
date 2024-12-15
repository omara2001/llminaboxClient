import React, { createContext, useContext, ReactNode } from "react";
import { useImmerReducer } from "use-immer";

export interface AppState {
  sidenav: {
    mini: boolean;
    hidden: boolean;
  };
  theme: "light" | "dark";
}

export type AppActions =
  | { type: "SET_SIDENAV_MINI"; value: boolean }
  | { type: "SET_SIDENAV_HIDDEN"; value: boolean }
  | { type: "SET_THEME"; value: AppState["theme"] };

export const defaultState: AppState = {
  sidenav: {
    mini: false,
    hidden: false
  },
  theme: "dark"
};

export function reducer(draft: AppState, action: AppActions) {
  switch (action.type) {
    case "SET_SIDENAV_MINI":
      draft.sidenav.mini = action.value;
      break;
    case "SET_SIDENAV_HIDDEN":
      draft.sidenav.hidden = action.value;
      break;
    case "SET_THEME":
      draft.theme = action.value;
      break;
  }
}

interface AppContextActions {
  setSidenavMini: (value: boolean) => void;
  setSidenavHidden: (value: boolean) => void;
  setTheme: (value: AppState["theme"]) => void;
}

export const AppContext = createContext<[AppState, AppContextActions]>([
  defaultState,
  {
    setSidenavMini: () => {},
    setSidenavHidden: () => {},
    setTheme: () => {}
  }
]);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [appData, dispatch] = useImmerReducer(reducer, defaultState);

  const actions: AppContextActions = {
    setSidenavMini: (value: boolean) =>
      dispatch({ type: "SET_SIDENAV_MINI", value }),

    setSidenavHidden: (value: boolean) =>
      dispatch({ type: "SET_SIDENAV_HIDDEN", value }),

    setTheme: (value: AppState["theme"]) =>
      dispatch({ type: "SET_THEME", value })
  };

  return (
    <AppContext.Provider value={[appData, actions]}>
      {children}
    </AppContext.Provider>
  );
}
