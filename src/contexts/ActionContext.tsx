import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface User {
  name: string;
}

interface ServerInfo {
  name: string;
  company: string;
}

interface Stream {
  id: string;
  name: string;
  updatedAt: string;
}

interface Commit {
  id: string;
  message: string;
  branchName: string;
  sourceApplication: string;
  referencedObject: string;
  authorName: string;
  createdAt: string;
}

interface AppState {
  user: User | null;
  serverInfo: ServerInfo | null;
  currentStream: Stream | null;
  latestCommits: Commit[] | null;
  previousCursors: (string | null)[];
  tableOptions: any;
  currentCommit: Commit | null;
}

const initialState: AppState = {
  user: null,
  serverInfo: null,
  currentStream: null,
  latestCommits: null,
  previousCursors: [null],
  tableOptions: null,
  currentCommit: null,
};

type Action = { type: string; payload?: any };

const ActionContext = createContext<
  { state: AppState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_SERVER_INFO":
      return { ...state, serverInfo: action.payload };
    case "SET_CURRENT_STREAM":
      return { ...state, currentStream: action.payload };
    case "SET_COMMITS":
      return { ...state, latestCommits: action.payload };
    case "RESET_PREV_CURSORS":
      return { ...state, previousCursors: [null] };
    case "ADD_CURSOR_TO_PREVIOUS_LIST":
      return {
        ...state,
        previousCursors: [...state.previousCursors, action.payload],
      };
    case "SET_COMMIT":
      return { ...state, currentCommit: action.payload };
    default:
      return state;
  }
};

const ActionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <ActionContext.Provider value={{ state, dispatch }}>
      {children}
    </ActionContext.Provider>
  );
};

export const useActionContext = () => {
  const context = useContext(ActionContext);
  if (!context)
    throw new Error("useAppContext must be used within the AppProvider");
  return context;
};

export default ActionProvider;
