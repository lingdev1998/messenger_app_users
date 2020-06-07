import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import moment from 'moment';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Collapse, Tag, Tooltip } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import PostItemExpand from "./PostItemExpand";
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector } from 'react-redux';

const { Panel } = Collapse;


export const PostItem = (props) => {
  const state = useSelector(state => state.user.userInfo);
  const [listComment, setListComment] = useState([]);
  const [isOwner, setOwner] = useState(false);
  const [defaultActiveKey, setDefaultActiveKey] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const input = useRef();
  const [userToReply, setUserToReply] = useState("");
  const [modeReply, setModeReply] = useState(0);
  const [parentId, setParentId] = useState(null);

  const [_count, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    var formData = new FormData();
    formData.append("postId", props.item.id);
    axios.post("/posts/getAllCommentInPost", formData).then(response => setListComment(response.data));
    axios.post("/posts/updateViewOfPost", formData).then(response => console.log(response));
    if (state.id === props.item.userPost) setOwner(true);

  }, [props.role, props.currentUser]);

  const handleExpand = (key, input) => {
    console.log("handleExpand");
    console.log(key);
    console.log(input);
    setDefaultActiveKey(!defaultActiveKey);
  }

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      console.log('do validate' + id);
      if (commentValue !== "") {
        var formData = new FormData();
        formData.append("postId", props.item.id);
        formData.append("commentContent", commentValue);
        if (modeReply === 0) {
          formData.append("parrentTag", "");
          formData.append("parentId", 0);
        } else {
          formData.append("parrentTag", userToReply);
          formData.append("parentId", parentId);

        }
        axios.post("/posts/postComment", formData).then(response => {
          setCommentValue("");
          axios.post("/posts/getAllCommentInPost", formData).then(response => setListComment(response.data));
          forceUpdate();
        });
      }
    }
  }
  const sfocusLv2 = (item, parent) => {
    console.log("lv122222");
    console.log(item);
    console.log(parent)
    setUserToReply("@" + item.firstName + item.lastName);
    setParentId(parent.id);
    setModeReply(2);
    input.current.focus();
  }
  const sfocus = (item) => {
    console.log("lv111");
    console.log(item);
    setParentId(item.id);
    setUserToReply("@" + item.firstName + item.lastName)
    setModeReply(1);
    input.current.focus();
  }
  const handleStopReply = () => {
    setModeReply(0);
    setUserToReply("");
  }
  return (
    <>
      <div className="row no-gutters" style={{ backgroundColor: "#F5F5F5", margin: "20px" }}   >
        <div className="col-12" style={{ padding: "0" }}>
          <div className="row">
            <div className="col-2">
              <div className="row post-header">
                <div className="col-12">
                  <img src={props.item.avatar} style={{ width: "100%", height: "100%" }} ></img>
                </div>
              </div>
            </div>
            <div className="col-10">
              <div className="row post-header">
                <div className="col-11">
                  <div className="row center post-header-userName">
                    <Link >{props.item.firstName + " " + props.item.lastName}</Link>
                  </div>
                  <div className="row center post-header-created">
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                      <span>{props.item.created_at}</span>
                    </Tooltip>
                  </div>
                  <div className="row">
                    <footer className="post-footer">
                      <div className="footer-wrap">
                        <ul className="footer-meta">
                          <li className="best-answer-meta">
                            <label onClick={() => handleExpand()}>
                              <i className="icon-comment"></i>
                              <span className="question-span" >{props.item.totalComment} Answers</span>
                            </label>
                          </li>
                          <li className="view-stats-meta">
                            <i className="icon-eye"></i>{" " + props.item.views + " "}
                            <span className="question-span">Views</span>
                          </li>
                        </ul>
                      </div>
                    </footer>
                  </div>
                </div>
                <div className="col-1">
                  <div className="row">
                    <Dropdown
                      overlay={(
                        <Menu>
                          <Menu.Item
                            disabled={isOwner === true ? false : true}
                            onClick={() => {
                              props.setUpdatePostIsShow(true);
                              props.setItemToUpDate(props.item);
                            }}>
                            Edit  {isOwner === true ? "" : "( Only available with owner)"}
                          </Menu.Item>
                          <Menu.Item
                            danger
                            disabled={(props.role === "admin" || isOwner === true) ? false : true}
                            onClick={() => props.showDeleteConfirm(props.item)}
                          >
                            Delete {(props.role === "admin" || isOwner === true) ? "" : "Only availeble with admin or owner"}
                          </Menu.Item>

                        </Menu>)}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <DownOutlined />
                      </a>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="row post-title">
                <h5><Link> {props.item.post_title} </Link></h5>
              </div>
              <div className="row post-content">
                <p>{props.item.post_content}</p>
              </div>
              {
                (defaultActiveKey === true && props.item.postImgUrl !== null )?
                 <div className="row post-img">
                    <img src={props.item.postImgUrl} />
                </div> : ""
              }
            </div>

          </div>
          <Collapse onChange={(key, input) => handleExpand(key, input)}>
            <Panel header={defaultActiveKey !== true ? "Click to reply" : "Click to collapse"} key="1" style={{ paddingTop: "0px" }}  >

              <div className="row">
                <div className="col-12">
                  <div className="row">
                    {userToReply !== "" ?
                      <Tag closable onClose={() => handleStopReply()}>
                        {userToReply}
                      </Tag> : ""
                    }
                  </div>
                  <div className="row">

                    <TextareaAutosize
                      placeholder='comment....'
                      style={{ width: "100%", margin: "0" }}
                      key={"textarea" + `${props.item.id}`}
                      onKeyDown={(e) => handleKeyDown(e, props.item.id)}
                      value={commentValue}
                      ref={input}
                      autoFocus
                      onChange={e => setCommentValue(e.target.value)}
                    />
                  </div>
                  {
                    listComment.map(item =>
                      item !== undefined ? <PostItemExpand _count={_count} sfocus={sfocus} sfocusLv2={sfocusLv2} textArea={input.current} item={item} /> : ""
                    )
                  }
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>

      </div>

    </>
  );
}

export default PostItem;