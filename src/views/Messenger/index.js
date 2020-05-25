import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { messengerActions } from './action/MessengerActions';
import ConversationList from './ConversationList/index';
import MessageList from './MessageList/index';
import './Messenger.css';
import { Row, Col } from 'reactstrap';
import PartnerProfile from './PartnerProfile/PartnerProfile';
export default function Messenger(props) {
  const dispatch = useDispatch();
  const [conversations, setConversations] = useState([]);
  const state = useSelector(state => state.messengerReducer.listConversation);
  useEffect(() => {
    dispatch(messengerActions.getAllConversation());
    console.log(state);
   setConversations([conversations, state])
  },[])

  return (
    <div className="row no-gutters">
        <Col md={3} style={{padding:"none !important"}}>
          {/* <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        /> */}

          {/* <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}

          <ConversationList conversations={conversations}  />

        </Col>
        <Col md={6}>
          <MessageList />

        </Col>
        <Col md={3}>
          <PartnerProfile />

        </Col>
      </div>
   );
}