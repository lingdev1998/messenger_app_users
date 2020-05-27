import {
    MESSENGER_ACTION_TYPES
} from "../action/MessengerActions";

import { REQUEST, SUCCESS, FAILURE } from "../../../utils/action-type.util";


const initialState = {
    listConversations: [],
    listMessages: [],
    currentUserName: "",
    currentConversation : false

};
export type MessengerReducer = Readonly<typeof initialState>;
export default function messengerReducer(state: MessengerReducer = initialState, action): MessengerReducer {
    switch (action.type) {
        //get All Conversation
        case REQUEST(MESSENGER_ACTION_TYPES.GET_ALL_CONVERSATION):
        case FAILURE(MESSENGER_ACTION_TYPES.GET_ALL_CONVERSATION):
            return { ...state }
        case SUCCESS(MESSENGER_ACTION_TYPES.GET_ALL_CONVERSATION):
            return { ...state, listConversations: action.payload }

        //get All Message of conversation
        case REQUEST(MESSENGER_ACTION_TYPES.GET_LIST_MESSAGE):
        case FAILURE(MESSENGER_ACTION_TYPES.GET_LIST_MESSAGE):
            return { ...state }
        case SUCCESS(MESSENGER_ACTION_TYPES.GET_LIST_MESSAGE):
            console.log(action.payload)
            return { ...state, listMessages: action.payload.messages, currentUserName: action.payload.currentUser }

        //send message
        case REQUEST(MESSENGER_ACTION_TYPES.SEND_MESSAGE):
        case FAILURE(MESSENGER_ACTION_TYPES.SEND_MESSAGE):
            return { ...state }
        case SUCCESS(MESSENGER_ACTION_TYPES.SEND_MESSAGE):
            console.log(action.payload)
            return { ...state }
        case MESSENGER_ACTION_TYPES.UPDATE_LIST_MESSAGE:
            return { ...state, listMessages: state.listMessages.concat(action.payload) }
        case MESSENGER_ACTION_TYPES.UPDATE_CURRENT_CONVERSATION:
            console.log("update conv",action.payload)
            return { ...state, currentConversation: action.payload }
        default:
            return {...state};
    }
}
