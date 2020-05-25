import axios from "axios";
 
export const MESSENGER_ACTION_TYPES= {
  GET_ALL_CONVERSATION : "GET_ALL_CONVERSATION"
};
 

export const messengerActions = {
    getAllConversation(){
        const request = () => {
            const result  =  axios.get("/conversation/getAllConversation").then(response => response.data);
            return result;
          }
          return{
            type : MESSENGER_ACTION_TYPES.GET_ALL_CONVERSATION,
            payload : request
          }
      },
};
