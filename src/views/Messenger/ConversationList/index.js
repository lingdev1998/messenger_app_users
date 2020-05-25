import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { messengerActions } from '../action/MessengerActions';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import {Row} from 'reactstrap';
import './ConversationList.css';


export default function ConversationList(props) {
   const [conversations, setConversations] = useState([]);
 
  useEffect(() => {
     
  },[])

 

    return (
      <div className="conversation-list">
         <Toolbar
          title="Conversation List"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
         <ConversationSearch />
        {
          props.conversations.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
}