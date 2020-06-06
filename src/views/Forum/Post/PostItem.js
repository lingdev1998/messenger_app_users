import React, { Component, useParams, useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,

} from "react-router-dom";
import PostItemExpand from "./PostItemExpand";
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector } from 'react-redux'
export const PostItem = (props) => {
  const state = useSelector(state => state.user.userInfo);
  const [listComment, setListComment] = useState([]);
  const [isExpand, setIsExpand] = useState(false);
  const [isOwner, setOwner] = useState(false);

  useEffect(() => {
    var formData = new FormData();
    formData.append("postId", props.item.id);
    axios.post("/posts/getAllCommentInPost", formData).then(response => setListComment(response.data));
    axios.post("/posts/updateViewOfPost", formData).then(response => console.log(response));
    if (state.id === props.item.userPost) setOwner(true);

  }, [props.role]);

  const handleExpand = () => {
    setIsExpand(!isExpand);
  }
  return (
    <div className=" row   post-item">
      <div className="col-12">
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
              <div className="col-10">
                <div className="row center post-header-userName">
                  <Link >{props.item.firstName + " " + props.item.lastName}</Link>
                </div>
                <div className="row center post-header-created">
                  {props.item.created_at}
                </div>
              </div>
              <div className="col-2">
                <div className="row">
                  {props.role === "admin" || isOwner === true ? "Can delete" : "Cant delete"}
                </div>
              </div>
            </div>
            <div className="row post-title">
              <Link><h3>{props.item.post_title}</h3></Link>
            </div>
            <div className="row post-content">
              <p>{props.item.post_content}</p>
            </div>
          </div>

        </div>
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
        {
          isExpand === true ?
            <div className="row">
              <div className="col-12">
                <TextareaAutosize
                  placeholder='comment....'
                  style={{ width: "100%" }}
                />
                {
                  listComment.map(item =>
                    item !== undefined ? <PostItemExpand item={item} /> : ""
                  )
                }
              </div>
            </div>
            : ""
        }
        {
          props.role === "admin" ? <button>delete</button> : ""
        }
      </div>
    </div>

  );
}

export default PostItem;