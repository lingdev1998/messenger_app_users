import axios from "axios";

export const FORUM_ACTION_TYPE = {
  GET_ALL_JOINED_GROUP: "GET_ALL_JOINED_GROUP",
 
};

 
export const getAllJoinedGroup = (params) => {
  return {
    type: FORUM_ACTION_TYPE.GET_ALL_JOINED_GROUP,
    payload: axios.get("/groups/getAllGroupJoined").then(response => response.data)
  }
};
 

