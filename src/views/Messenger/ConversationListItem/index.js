import React, { useEffect, useState } from 'react';
import shave from 'shave';
import { useDispatch } from 'react-redux';
import { getListMessages } from '../action/MessengerActions';
import './ConversationListItem.css';
import { Form } from 'formik';

export default function ConversationListItem(props) {
  const dispatch = useDispatch();
  const [conversation_id,setConversation_id] = useState();

  useEffect(() => {
    shave('.conversation-snippet', 20);
    setConversation_id(props.data.conversation_id);
   },[props.selected])


  const handleConversationTitleClick = () => {
    console.log("thay doi o list tem",conversation_id)
    let formData = new FormData();
    formData.append("conversation_id",conversation_id);
    dispatch(getListMessages(formData));
    props.handleChangeConversation(conversation_id);
    console.log(conversation_id);
  }


  const { avatar, title, text } = props.data;
  const {selected} = props.selected;
  console.log(selected);
  if(selected === true){
    return (
      <div className="conversation-list-item" style={{backgroundColor:'red'}} onClick={()=> handleConversationTitleClick()} > 
      <img className="conversation-photo" src={avatar} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{title}</h1>
        <p className="conversation-snippet">{text}</p>
      </div>
    </div >
    );
  }
  else{
    return (
      <div className="conversation-list-item"    onClick={()=> handleConversationTitleClick()} > 
      <img className="conversation-photo" src={avatar} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{title}</h1>
        <p className="conversation-snippet">{text}</p>
      </div>
    </div >
    );
  }
}