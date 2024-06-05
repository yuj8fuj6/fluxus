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
    try {
      await exchangeAccessCode(accessCode);
      console.log("Token exchange successful and user is logged in.");
      return true;
    } catch (error) {
      console.error("Failed to exchange access code:", error);
      return false;
    }
  };

  const fetchUser = async () => {
    try {
      const json = await getUserData();
      if (json && json.data) {
        const { user, serverInfo } = json.data;
        dispatch({ type: "SET_USER", payload: user });
        dispatch({ type: "SET_SERVER_INFO", payload: serverInfo });
        console.log("User and server info fetched and set successfully");
      } else {
        console.log("No data received from getUserData:", json);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const redirectToAuth = () => {
    goToSpeckleAuthPage();
  };

  const handleStreamSelection = async (stream: Stream) => {
    dispatch({ type: "SET_CURRENT_STREAM", payload: stream });
    dispatch({ type: "RESET_PREV_CURSORS" });
    const commitsJson = await getStreamCommits(stream.id, 5, null);
    dispatch({ type: "SET_COMMITS", payload: commitsJson });
  };

  return {
    logout,
    handleExchangeAccessCode,
    fetchUser,
    redirectToAuth,
    handleStreamSelection,
  };
};
