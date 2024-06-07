export const userInfoQuery = () => `query {
      user {
        name
      },
      serverInfo {
        name
        company
      }
    }`;

export const streamSearchQuery = (search) => `query {
      streams(query: "${search}") {
        totalCount
        cursor
        items {
          id
          name
          updatedAt
        }
      }
    }`;

export const streamCommitsQuery = (streamId, itemsPerPage, cursor) => `query {
    stream(id: "${streamId}"){
      commits(limit: ${itemsPerPage}, cursor: ${
  cursor ? '"' + cursor + '"' : null
}) {
        totalCount
        cursor
        items{
          id
          message
          branchName
          sourceApplication
          referencedObject
          authorName
          createdAt
        }
      }
    }
  }`;

export const commitObjectQuery = (streamId, commitId) => `query{
    stream(id: "${streamId}"){
      commit(id: "${commitId}"){
        referencedObject
      }
    }
  }`;

// Trial Selected Commit Query - to delete later
export const streamCommitQuery = (streamId, commitId) => `query{
    stream(id: "${streamId}"){
      commit(id: "${commitId}"){
          id
          message
          branchName
          sourceApplication
          referencedObject
          authorName
          createdAt
      }
    }
  }`;

// Trial Object Query - to delete later
export const commitObjectQueryTrial = (streamId, objectId) => `query{
      stream(id:"${streamId}"){
     	id
      name
      object(id:"${objectId}"){
      id
      createdAt
      totalChildrenCount
      children{
        cursor
        totalCount
        objects{
          data
        }
      }
    }
  }     
  }`;
