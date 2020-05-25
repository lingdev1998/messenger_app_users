import {
    MESSENGER_ACTION_TYPES
} from "../action/MessengerActions";

import { REQUEST, SUCCESS, FAILURE } from "../../../utils/action-type.util";


const initialState = {
    listConversation: []

};
export type MessengerReducer = Readonly<typeof initialState>;
export default function messengerReducer(state:MessengerReducer  = initialState, action):MessengerReducer {
    switch (action.type) {
        case REQUEST(MESSENGER_ACTION_TYPES.GET_ALL_CONVERSATION):
        case FAILURE(MESSENGER_ACTION_TYPES.GET_ALL_CONVERSATION):
            return { ...state }
        case SUCCESS(MESSENGER_ACTION_TYPES.GET_ALL_CONVERSATION):
            console.log("Oke",action.payload);
            return { ...state, listConversation: action.payload }
        default:
            return state;
    }
}
