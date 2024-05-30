import { userInfoQuery, streamSearchQuery, streamCommitsQuery } from "./speckleQueries";

export const APP_NAME = process.env.REACT_APP_SPECKLE_NAME;
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const TOKEN = `${APP_NAME}.AuthToken`;
export const REFRESH_TOKEN = `${APP_NAME}.RefreshToken`;
export const CHALLENGE = `${APP_NAME}.Challenge`;

// Redirects to the Speckle server authentication page, using a randomly generated challenge.
export function goToSpeckleAuthPage() {
  // Generate random challenge
  const challenge =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  // Save challenge in localStorage
  localStorage.setItem(CHALLENGE, challenge);
  // Send user to auth page
  window.location.href = `${SERVER_URL}/authn/verify/${process.env.REACT_APP_SPECKLE_ID}/${challenge}`;
}

// Log out the current user. This removes the token/refreshToken pair.
export function speckleLogOut() {
  // Remove both token and refreshToken from localStorage
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

// Exchanges the provided access code with a token/refreshToken pair, and saves them to local storage.
export async function exchangeAccessCode(accessCode) {
  const response = await fetch(`${SERVER_URL}/auth/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessCode: accessCode,
      appId: process.env.REACT_APP_SPECKLE_ID,
      appSecret: process.env.REACT_APP_SPECKLE_SECRET,
      challenge: localStorage.getItem(CHALLENGE),
    }),
  });
  const data = await response.json();
  if (data.token) {
    // If retrieving the token was successful, remove challenge and set the new token and refresh token
    localStorage.removeItem(CHALLENGE);
    localStorage.setItem(TOKEN, data.token);
    localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
  }
  return data;
}

// Calls the GraphQL endpoint of the Speckle server with a specific query.
export async function speckleFetch(query) {
  let token = localStorage.getItem(TOKEN);
  if (token)
    try {
      var res = await fetch(`${SERVER_URL}/graphql`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
        }),
      });
      return await res.json();
    } catch (err) {
      console.error("API call failed", err);
    }
  else return Promise.reject("You are not logged in (token does not exist)");
}

// Fetch the current user data using the userInfoQuery
export const getUserData = () => speckleFetch(userInfoQuery());

// Fetch the stream data using the streamSearchQuery
export const searchStreams = (e) => speckleFetch(streamSearchQuery(e));

// Fetch the stream commits using the streamCommitsQuery
export const getStreamCommits = (streamId, itemsPerPage, cursor) =>
  speckleFetch(streamCommitsQuery(streamId, itemsPerPage, cursor));