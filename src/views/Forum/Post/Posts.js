import React, { Component, useParams, useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import PostItem from './PostItem';
import "./PostItem.scss";

export const Posts = (props) => {
  const [groupId, setGroupId] = useState();
  const [posts, setPosts] = useState([]);
  const [role, setRole] = useState("");
  const [currentRangeRadio, setCurrentRangeRadio] = useState('getAllPosts');
  const [groupInfo, setGroupInfo] = useState(undefined);
  const handleChangeRangeRadio = (e) => {
    setCurrentRangeRadio(e.currentTarget.value);
    if (e.currentTarget.value === "getAllPosts") {
      var formData = new FormData();
      formData.append("groupId", props.id);
      axios.post("/groups/getAllPostInGroup", formData).then(response => setPosts(response.data.data));
    }
    else if (e.currentTarget.value === "getYourPosts") {
      var formData = new FormData();
      formData.append('owner', true);
      formData.append("groupId", props.id);
      axios.post("/groups/getAllPostInGroup", formData).then(response => setPosts(response.data.data));

    }
  }
  useEffect(() => {
    setGroupId(props.id);
    var formData = new FormData();
    formData.append("groupId", props.id);
    axios.post("/groups/checkIsAdminGroup", formData).then(response => {
      setRole(response.data.role);
      if (response.data.role === "admin" || response.data.role === "member") {
        axios.post("/groups/getAllPostInGroup", formData).then(response =>  
          setPosts(response.data.data) 
        );
        axios.post("/groups/getInfoOfGroup", formData).then(response =>  
          setGroupInfo(response.data) 
        );
      }
    });
  }, [props.id]);
  if (role !== "Not Allow" && role !== "") {
    return (
      <div className="row no-gutters">
        <div className="col-2">
          <div className="row" style={{ padding: "30px" }}>
            <div className="col-12">
              <div class="widget widget_ask row form">
                <button className="btn btn-primary" style={{ width: "100%" }}>Tạo Bài Đăng Mới</button>
              </div>
            </div>
          </div>
          <div className="row" style={{ padding: "30px" }}>
            <div className="col-12">
              <form className="form">
                <h2>Lọc</h2>
                <div className="inputGroup">
                  <input id="radio1" key="radio1" name="listType" type="radio" value="getAllPosts" checked={currentRangeRadio === "getAllPosts"} onChange={e => handleChangeRangeRadio(e)} />
                  <label htmlFor="radio1">Tất Cả</label>
                </div>
                <div className="inputGroup">
                  <input id="radio2" key="radio2" name="radio" type="radio" value="getYourPosts" checked={currentRangeRadio === "getYourPosts"} onChange={e => handleChangeRangeRadio(e)} />
                  <label htmlFor="radio2">Bài Đăng Của Bạn</label>
                </div>
                {/* <h2>Loại <input key="option0" id="option0" name="option0" type="checkbox" checked={props.checkAllStatus} value="checkAll" onClick={e => props.handleAllChecked(e)} /></h2>
     
                        {
                            listType.map(item =>
                                item !== undefined ?
                                    <div className="inputGroup">
                                        <input key={"option" + item.id} id={"option" + item.id}  value={item.id} checked={item.isChecked} name="option2" type="checkbox" onClick={e => props.handleCheckBoxChangeStatus(e)} />
                                        <label htmlFor={"option" + item.id}>{item.typeName}</label>
                                    </div> : ""
                            )
                        } */}
              </form>
            </div>
          </div>
        </div>
        <div className="col-8 forum">
          {
            posts.map(item =>
              item != undefined ?
                <PostItem
                  item={item}  role={role}
                /> : ""
            )
          }
        </div>
        <div className="col-2">
          <div className="row" style={{ padding: "30px" }}>
            <div className="col-12">
              <section id="stats-widget-2" className="widget-no-divider widget stats-widget" style={{ paddingTop: "20px", borderBottom: "none", margin: "-30px 0 0", paddingBottom: "20px" }}>
                <h3 className="screen-reader-text">Stats</h3>
                <div className="widget-wrap">
                  <ul className="stats-inner" style={{ margin: "0", padding: "0", overflow: "hidden" }}>
                    <li className="stats-questions">
                      <div><span className="stats-text">Bài Đăng</span><span className="stats-value">{groupInfo !== undefined ? groupInfo.totalPost :""}</span></div>
                    </li>
                    <li className="stats-answers">
                      <div><span className="stats-text">Bình Luận</span><span className="stats-value">{groupInfo !== undefined ? groupInfo.totalComments :""}</span></div>
                    </li>
                    <li className="stats-best_answers">
                      <div><span className="stats-text">Lượt Xem</span><span className="stats-value">{groupInfo !== undefined ? groupInfo.totalViews :""}</span></div>
                    </li>
                    <li className="stats-users">
                      <div><span className="stats-text">Thành Viên</span><span className="stats-value">{groupInfo !== undefined ? groupInfo.totalMember :""}</span></div>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

    );
  }
  else {
    return (
      <div >Not found</div>
    )
  }
}

export default Posts;