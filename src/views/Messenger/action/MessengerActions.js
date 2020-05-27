import axios from "axios";

export const MESSENGER_ACTION_TYPES = {
  GET_ALL_CONVERSATION: "GET_ALL_CONVERSATION",
  GET_LIST_MESSAGE: "GET_LIST_MESSAGE",
  SEND_MESSAGE:"SEND_MESSAGE",
  UPDATE_LIST_MESSAGE:"UPDATE_LIST_MESSAGE",
  UPDATE_CURRENT_CONVERSATION : "UPDATE_CURRENT_CONVERSATION"
};


export const messengerActions = {
  getAllConversation() {
    const request = async () => {
      const result = await axios.get("/conversation/getAllConversation").then(response => response.data);
      return result;
    }
    return {
      type: MESSENGER_ACTION_TYPES.GET_ALL_CONVERSATION,
      payload: request
    }
  },
};
export const getListMessages = (params) => {
  return {
    type: MESSENGER_ACTION_TYPES.GET_LIST_MESSAGE,
    payload: axios.post("/messages/getAllMessages", params).then(response => response.data)
  }
};
export const sendMessage = (params) => {
  return {
    type: MESSENGER_ACTION_TYPES.SEND_MESSAGE,
    payload: axios.post("/messages/createNewMessage", params).then(response => response.data)
  }
}
export const updateListMessage = (params) => {
  return {
    type: MESSENGER_ACTION_TYPES.UPDATE_LIST_MESSAGE,
    payload: params
  }
}
export const updateCurrentConversation = (params) => {
  return {
    type: MESSENGER_ACTION_TYPES.UPDATE_CURRENT_CONVERSATION,
    payload: params
  }
}

