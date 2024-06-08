import {
  userInfoQuery,
  streamSearchQuery,
  streamCommitsQuery,
  commitObjectQuery,
  streamCommitQuery,
  commitObjectQueryTrial,
} from "./speckleQueries";

export const APP_NAME = process.env.REACT_APP_SPECKLE_APP_NAME;
export const SERVER_URL = process.env.REACT_APP_SPECKLE_SERVER_URL;
export const TOKEN = `${APP_NAME}.AuthToken`;
export const REFRESH_TOKEN = `${APP_NAME}.RefreshToken`;
export const CHALLENGE = `${APP_NAME}.Challenge`;
export const STREAM_ID = `${APP_NAME}.StreamId`;
export const COMMIT_ID = `${APP_NAME}.CommitId`;
export const OBJECT_ID = `${APP_NAME}.ObjectId`;
const APP_ID = process.env.REACT_APP_SPECKLE_APP_ID;
const APP_SECRET = process.env.REACT_APP_SPECKLE_APP_SECRET;
//console.log(REACT_APP_SPECKLE_APP_NAME);
// Redirects to the Speckle server authentication page, using a randomly generated challenge.
export function goToSpeckleAuthPage() {
  // Generate random challenge
  const challenge =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  // Save challenge in localStorage
  localStorage.setItem(CHALLENGE, challenge);
  // Send user to auth page
  window.location.href = `${SERVER_URL}/authn/verify/${APP_ID}/${challenge}`;
}

// Log out the current user. This removes the token/refreshToken pair.
export function speckleLogOut() {
  // Remove both token, refreshToken, selected stream, commit, and model ids from localStorage
  localStorage.removeItem(CHALLENGE);
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(STREAM_ID);
  localStorage.removeItem(COMMIT_ID);
  localStorage.removeItem(OBJECT_ID);
  localStorage.removeItem("fluxus.ComponentId");
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
      appId: APP_ID,
      appSecret: APP_SECRET,
      challenge: localStorage.getItem(CHALLENGE),
    }),
  });
  const data = await response.json();
  if (data.token) {
    // If retrieving the token was successful, remove challenge and set the new token and refresh token
    // localStorage.removeItem(CHALLENGE);
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
export const getStreamCommits = async (streamId, itemsPerPage, cursor) => {
  const res = await speckleFetch(
    streamCommitsQuery(streamId, itemsPerPage, cursor),
  );
  const commits = res.data.stream.commits.items;
  return commits;
};

export async function getSpeckleCommit(streamId, commitId) {
  let res = await speckleFetch(commitObjectQuery(streamId, commitId));
  let object_id = res.data.stream.commit.referencedObject;
  let o_url = `${SERVER_URL}/streams/${streamId}/objects/${object_id}`;
  return o_url;
  /*
  if(objectlist.length ==0){return [];}
  let objurls = [];

  for(let i = 0; i < objectlist.length; i++){
    let o_url = b_url+"/streams/"+stream_id+"/objects/"+objectlist[i].referencedObject;
    let options = JSON.stringify({
      objectUrl: o_url,
    });
    objurls.push(options);
  }
  console.log(objurls)
  return objurls
  */
}

// Trial function to retrieve Speckle commit - to delete later
export const getSelectedCommit = async (streamId, commitId) => {
  const res = await speckleFetch(streamCommitQuery(streamId, commitId));
  const commit = res.data.stream.commit;
  return commit;
};

// Trial function to retrieve Speckle object - to delete later
export const getSelectedObject = async (streamId, objectId) => {
  const res = await speckleFetch(commitObjectQueryTrial(streamId, objectId));
  const object = res.data.stream;
  return object;
};
