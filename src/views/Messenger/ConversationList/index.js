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

  useEffect(() => {
    setConversations(conversations => [...conversations, listConversations]);
  }, [listConversations])



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
      <div class="conversation-list">
        <ConversationSearch />
        {
          listConversations.map(conversation =>
            <ConversationListItem
            handleChangeConversation={props.handleChangeConversation}
              key={conversation.title}
              data={conversation}
            />
          )
        }
      </div>

    </div>
  );
}
export default ConversationList;