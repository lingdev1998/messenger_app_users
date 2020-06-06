import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messengerActions } from './action/MessengerActions';
import ConversationList from './ConversationList/index';
import MessageList from './MessageList/index';
import './Messenger.css';
import { Row, Col } from 'reactstrap';
import PartnerProfile from './PartnerProfile/PartnerProfile';
import { updateListMessage, updateCurrentConversation } from './action/MessengerActions';


export const Messenger = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.messengerReducer.listConversations);
  const currentConv = useSelector(state => state.messengerReducer.currentConversation);
  const [currentUser, setCurrentUser] = useState();
  const [currentConversation, setCurrentConversation] = useState(false);
  const handleChangeConversation = (conversation_id) => {
    const temp = state.find(x => x.conversation_id === conversation_id);
    setCurrentConversation(temp);
    dispatch(updateCurrentConversation(temp));
  }
  const [lastesMess, setLastestMess] = useState({});
  const username = localStorage.getItem("userName");
  const id = localStorage.getItem("id");
  const ws = useRef(null);

  useEffect(() => {
    dispatch(messengerActions.getAllConversation());
    setCurrentConversation(currentConv);
    setCurrentUser({ username, id });
    ws.current = new WebSocket("ws://localhost:8080");
    ws.current.onopen = () => {
      let pkg = {
        user: { username, id },/* Defined in index.php */
        type: 'registration'
      }

      pkg = JSON.stringify(pkg)

      if (ws && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(pkg)
      }
      console.log('connected');
    };
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);
  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {

      const message = JSON.parse(e.data);
      console.log(message);
      if (message.type === "message") {
        console.log(message);
        if (message.to_user !== undefined && message.to_user !== null) {
          if (message.user.username == currentConversation.partner) {
            console.log(message);
            let params = {
              id: "22",
              guid: null,
              conversation_id: currentConversation.conversation_id,
              userName_sender: message.user.username,
              message_type: "text",
              message: message.message,
              created_at: "2020-05-27 02:20:53",
              deleted_at: null
            };
            dispatch(updateListMessage(params));
          }
        }
      }
    };

  }, [currentConversation]);



  return (
    <div className="row no-gutters">
      <Col md={3} style={{ padding: "none !important" }}>
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

        <ConversationList  currentConversation={currentConv} handleChangeConversation={handleChangeConversation} />

      </Col>
      <Col md={6}>
        <MessageList lastesMess={lastesMess} currentUser={currentUser} ws={ws.current} currentConversation={currentConv} />

      </Col>
      <Col md={3}>
        <PartnerProfile currentConversation={currentConv} />

      </Col>
    </div>
  );
}
export default Messenger;
