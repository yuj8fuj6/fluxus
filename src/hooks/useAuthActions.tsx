import {
  getUserData,
  goToSpeckleAuthPage,
  exchangeAccessCode,
  getStreamCommits,
  speckleLogOut,
} from "../speckleUtils";
import { streamCommitsQuery } from "../speckleQueries";

import { useActionContext } from "../contexts/ActionContext";

interface Stream {
  id: string;
  name: string;
  updatedAt: string;
}

export const useAuthActions = () => {
  const { dispatch } = useActionContext();

  const logout = async () => {
    speckleLogOut();
    dispatch({ type: "SET_USER", payload: null });
    dispatch({ type: "SET_SERVER_INFO", payload: null });
    dispatch({ type: "SET_CURRENT_STREAM", payload: null });
    dispatch({ type: "SET_COMMITS", payload: null });
    dispatch({ type: "RESET_PREV_CURSORS" });
  };

  const handleExchangeAccessCode = async (accessCode: string) => {
    const result = await exchangeAccessCode(accessCode);
    // Optionally dispatch actions based on result
  };

  const fetchUser = async () => {
    const json = await getUserData();
    const data = json.data;
    dispatch({ type: "SET_USER", payload: data.user });
    dispatch({ type: "SET_SERVER_INFO", payload: data.serverInfo });
  };

  const redirectToAuth = () => {
    goToSpeckleAuthPage();
  };

  const handleStreamSelection = async (stream: Stream) => {
    dispatch({ type: "SET_CURRENT_STREAM", payload: stream });
    dispatch({ type: "RESET_PREV_CURSORS" });
    const commitsJson = await getStreamCommits(
      streamCommitsQuery(stream.id, 5, null),
    );
    dispatch({ type: "SET_COMMITS", payload: commitsJson.data.stream.commits });
  };

  return {
    logout,
    handleExchangeAccessCode,
    fetchUser,
    redirectToAuth,
    handleStreamSelection,
  };
};