import React, { createElement, useState , useEffect} from 'react';
import { Comment, Tooltip, Avatar ,Tag} from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import {useSelector} from 'react-redux';

const PostItemExpandLv2 = (props) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [children , setChildren] = useState([]);

  const state = useSelector(state=>state.user.userInfo);
  useEffect(() => {
    var formData = new FormData();
    formData.append("commentId", props.item.id)
    axios.post("/posts/getAllReplyComment",formData).then(response => setChildren(response.data));
  },[props._count]);
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <span key="comment-basic-like">
      <Tooltip title="Like">
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
          onClick: like,
        })}
      </Tooltip>
      <span className="comment-action">{likes}</span>
    </span>,
    <span key="comment-basic-dislike">
      <Tooltip title="Dislike">
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined, {
          onClick: dislike,
        })}
      </Tooltip>
      <span className="comment-action">{dislikes}</span>
    </span>, 
    <span key="comment-basic-reply-to" style={{display:(props.item.userComment === state.id ? "none" : "block")}} onClick={()=>props.sfocus(props.item,props.parrentItem)}>Reply to</span>

   ];

  return (
    <Comment
      actions={actions}
      author={<a>{props.item.firstName + " " + props.item.lastName}</a>}
      avatar={
        <Avatar
          src={props.item.avatar}
          alt={props.item.firstName + " " + props.item.lastName}
        />
      }
      content={
        <p>
          {props.item.parrentTag !== null ? <Tag>{props.item.parrentTag}</Tag> : ""}{props.item.comment_content}
        </p>
      }
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{props.item.created_at}</span>
        </Tooltip>
      }
      >
           {children.map(item => 
              item !== undefined ? <PostItemExpandLv2 sfocus={props.sfocus} item={item}/> :""
            )}
 
 
    </Comment>
  );
};
export default PostItemExpandLv2;