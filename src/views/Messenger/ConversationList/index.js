import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import { Row } from 'reactstrap';
import './ConversationList.css';


export const ConversationList = (props) => {
  const listConversations = useSelector(state => state.messengerReducer.listConversations);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(0);
  useEffect(() => {
    setConversations(conversations => [...conversations, listConversations]);
    setCurrentConversation(props.currentConversation.conversation_id);
    console.log("rerender");
    console.log("current:" ,currentConversation)
  }, [listConversations, props.currentConversation])


  return (
    <div className="card  section-messenger">
      {/* <Toolbar
        title="Conversation List"
        leftItems={[
          <ToolbarButton key="cog" icon="ion-ios-cog" />
        ]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
        ]}
      /> */}

      <div className="card-header">
        <h5 className="card-title mb-0 text-center">Conversation List</h5>
      </div>
      <div className="conversation-list">
        <ConversationSearch />
        {
          listConversations.map(function (conversation) {
            if (conversation.conversation_id === currentConversation) {
              return <ConversationListItem
                handleChangeConversation={props.handleChangeConversation}
                key={conversation.title}
                data={conversation}
                selected={true}
              />
            }
            else{
              return <ConversationListItem
                handleChangeConversation={props.handleChangeConversation}
                key={conversation.title}
                data={conversation}
                selected={false}
                />
            }
          })
        }
      </div>

    </div>
  );
}
export default ConversationList;