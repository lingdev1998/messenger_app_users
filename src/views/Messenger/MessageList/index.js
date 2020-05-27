import React, { useEffect, useState } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import './MessageList.css';
import { Row } from 'reactstrap';
import { sendMessage,updateListMessage } from '../action/MessengerActions';
import axios from 'axios';
export default function MessageList(props) {
  //dispatch
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.messengerReducer.currentUserName);
  const listMessages = useSelector(state => state.messengerReducer.listMessages);
  const [lastesMess,setLastesMess] = useState();
  const [crUser, setCurrentUser] = useState("");
  const [input, setInput] = useState("");
  const [list, setListMsg] = useState([]);
  useEffect(() => {
    setCurrentUser(currentUser);
    setListMsg(listMessages);

    

  }, [props.currentConversation,currentUser, listMessages,props.lastestMess]);


  useEffect(() => {
    setCurrentUser(currentUser);
    setListMsg(listMessages);
      if(props.lastestMess !== undefined){
        console.log("last",props.lastestMess);
        if (props.lastestMess.to_user !== undefined && props.lastestMess.to_user !== null) {
          if (props.lastestMess.user.username == props.currentConversation.partner) {
            console.log(props.lastestMess);
            let params = {
              id: "22",
              guid: null,
              conversation_id: props.currentConversation.conversation_id,
              userName_sender: props.lastestMess.user.username,
              message_type: "text",
              message: props.lastestMess.message,
              created_at: "2020-05-27 02:20:53",
              deleted_at: null
            };
            dispatch(updateListMessage(params));
          }
        }
      }
  }, [props.lastestMess]);

  const handleSendMessage = (event) => {
    if (event.key === "Enter" && input !== "") {
      let formData = new FormData();
      formData.append("conversation_id", props.currentConversation.conversation_id);
      formData.append("messageContent", input);
      formData.append("massageType", "text");
      axios.post("/messages/createNewMessage", formData).then(response => {
        setInput("");
        try {
          let to_user = {
            id: props.currentConversation.partnerId,
            username: props.currentConversation.partner
          };
          let pkg = {
            user: props.currentUser, 
            message: input,
            to_user: to_user,
            type: 'message'
          }
          pkg = JSON.stringify(pkg)
          props.ws.send(pkg) //send data to the server
          console.log("sendded");
        } catch (error) {
          props.ws.log(error) // catch error
        }
        dispatch(updateListMessage(response.data));
      });

    }
  }
  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const renderMessages = () => {
    let i = 0;
    let messageCount = listMessages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = listMessages[i - 1];
      let current = listMessages[i];
      let next = listMessages[i + 1];
      let isMine = current.userName_sender === currentUser;
      let currentMoment = moment(current.created_at);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.created_at);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.userName_sender === current.userName_sender;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.created_at);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.userName_sender;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

  return (
    <div className="card section-messenger">
      {/* <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}
      <div className="card-header">
        <h5 className="card-title mb-0  text-center">Conversation Title</h5>
      </div>
      {
        props.currentConversation !== false ?
        (
          <div className="message-list-container">
          <div className="col-12 message-list-container-item">
            {renderMessages()}
          </div>
          <div class="col-12 compose">
            <Row>
  
              <Compose handleSendMessage={handleSendMessage} input={input} onInputChange={onInputChange} rightItems={[
                <ToolbarButton key="photo" icon="ion-ios-camera" />,
                <ToolbarButton key="image" icon="ion-ios-image" />,
                <ToolbarButton key="audio" icon="ion-ios-mic" />,
                <ToolbarButton key="money" icon="ion-ios-card" />,
                <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
                <ToolbarButton key="emoji" icon="ion-ios-happy" />
              ]} />
            </Row>
          </div>
        </div>
        ) :<div className="card-body text-center" style={{ minHeight: "100%" }}>None Message</div> 
      }


    </div>
  );
}