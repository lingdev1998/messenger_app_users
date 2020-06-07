import React, { Component, useParams, useEffect, useState, useReducer } from 'react';
import { Row, Col, Card } from 'reactstrap';
import axios from 'axios';
import PostItem from './PostItem';
import "./PostItem.scss";
import 'antd/dist/antd.css';
import { Result, Button, Typography, Collapse, List, Avatar, Skeleton } from 'antd';
import CreateNewPost from './CreateNewPost';
import { useSelector } from 'react-redux';
import EditPost from './EditPost';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { Panel } = Collapse;
const { Title } = Typography;
const { Text, Link } = Typography;
export const Posts = (props) => {
  const [groupId, setGroupId] = useState();
  const [posts, setPosts] = useState([]);
  const [role, setRole] = useState("");
  const [currentRangeRadio, setCurrentRangeRadio] = useState('getAllPosts');
  const [groupInfo, setGroupInfo] = useState(undefined);
  const [createNewPostIsShow, setCreateNewPostIsShow] = useState(false);
  const [updatePostIsShow, setUpdatePostIsShow] = useState(false);
  const [itemToUpdate, setItemToUpDate] = useState(undefined);
  const [_count, forceUpdate] = useReducer(x => x + 1, 0);
  const userState = useSelector(state => state.user.userInfo);
  const [listMember, setListMember] = useState([]);
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
    console.log(userState);
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
        axios.post("/groups/getAllMemberInGroup", formData).then(response =>
          setListMember(response.data.rows)
        );
      }
    });
  }, [props.id, _count]);


  const onCreatePost = (values) => {
    console.log('Received values of form: ', values);
    var formData = new FormData();
    formData.append("groupId", groupInfo.id);
    formData.append("postTitle", values.postTitle);
    formData.append("postContent", values.content);
    formData.append("imgUrl", values.imgUrl);
    axios.post("/posts/createNewPost", formData).then(response => forceUpdate());
    setCreateNewPostIsShow(false);
  }
  const onUpdatePost = (values) => {
    console.log('Received values of form: ', values);
    var formData = new FormData();
    formData.append("postId", values.postId);
    formData.append("postTitle", values.postTitle);
    formData.append("postContent", values.postContent);
    formData.append("postImgUrl", values.imgUrl);
    axios.post("/posts/updatePost", formData).then(response => forceUpdate());
    setUpdatePostIsShow(false);
  }

  const showDeleteConfirm = (item) => {
    confirm({
      title: 'Do you want to delete this post??',
      icon: <ExclamationCircleOutlined />,
      content: 'abcxyzzzz',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log(item);
        onDeletePost(item);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const onDeletePost = (item) => {
    var formData = new FormData();
    formData.append("groupId", item.groupId);
    formData.append("postId", item.id)
    axios.post("/posts/deletePost", formData).then(response => forceUpdate());
  }
  if (role !== "Not Allow" && role !== "") {
    return (
      <>
        <div className="row no-gutters" style={{ padding: "30px", paddingTop: "0px" }}>
          {/* <p>Rendered {_count} times</p> */}
        </div>
        <div className="row no-gutters" style={{ background: "white" }} >
          <div className="col-2" style={{ borderRight: "1px solid", borderColor: "#E3E4E6" }}>
            <div className="row" style={{ padding: "30px" }}>
              <div className="col-12">

                <section id="stats-widget-2" className="widget-no-divider widget stats-widget" style={{ paddingTop: "20px", borderBottom: "none", margin: "-30px 0 0", paddingBottom: "20px" }}>
                  <h3 className="screen-reader-text"><Title level={2}>{groupInfo !== undefined ? groupInfo.group_name : ""}</Title></h3>
                  <div className="widget-wrap">
                    <Text code>Admin: <Link href="https://ant.design" target="_blank">{groupInfo !== undefined ? groupInfo.firstName + " " + groupInfo.lastName : ""}</Link> </Text>
                  </div>
                  <div className="widget-wrap">
                    <Text code>Created at: {groupInfo !== undefined ? groupInfo.created_at : ""} </Text>
                  </div>
                </section>
                <section id="stats-widget-2" className="widget-no-divider widget stats-widget" style={{ paddingTop: "20px", borderBottom: "none", margin: "-30px 0 0", paddingBottom: "20px" }}>
                  <h3 className="screen-reader-text">Stats</h3>
                  <div className="widget-wrap">
                    <ul className="stats-inner" style={{ margin: "0", padding: "0", overflow: "hidden" }}>
                      <li className="stats-questions">
                        <div><span className="stats-text">Bài Đăng</span><span className="stats-value">{groupInfo !== undefined ? groupInfo.totalPost : ""}</span></div>
                      </li>
                      <li className="stats-answers">
                        <div><span className="stats-text">Bình Luận</span><span className="stats-value">{groupInfo !== undefined ? groupInfo.totalComments : ""}</span></div>
                      </li>
                      <li className="stats-best_answers">
                        <div><span className="stats-text">Lượt Xem</span><span className="stats-value">{groupInfo !== undefined ? groupInfo.totalViews : ""}</span></div>
                      </li>
                      <li className="stats-users">
                        <div><span className="stats-text">Thành Viên</span><span className="stats-value">{groupInfo !== undefined ? groupInfo.totalMember : ""}</span></div>
                      </li>
                    </ul>
                  </div>
                </section>
                <section id="stats-widget-2" className="widget-no-divider widget stats-widget" style={{ paddingTop: "20px", borderBottom: "none", margin: "-30px 0 0", paddingBottom: "20px" }}>
                  <h3 className="screen-reader-text">More</h3>
                  <Collapse  >
                    {
                      role === "admin" ?
                        <Panel header="Request Join" key="1">

                        </Panel> : ""
                    }
                    <Panel header="Orther Member" key="2">
                      <List
 
                        dataSource={listMember}
                        renderItem={item => (
 
                               <List.Item.Meta
                                avatar={
                                  <Avatar src={item.avatar} />
                                }
                                title={<a href="https://ant.design">{item.firstName+" " + item.lastName}</a>}
                               />
                         )}
                      />
                    </Panel>
                  </Collapse>
                </section>
              </div>
            </div>
          </div>
          <div className="col-8 forum">
            <div className="row no-gutters"   >
              <div className="col-12" style={{ padding: "0" }}>
                <Card style={{ border: "none" }}>
                  <div className="listGroup">
                    {
                      posts.map(item =>
                        item != undefined ?
                          <PostItem
                            item={item}
                            role={role}
                            setUpdatePostIsShow={setUpdatePostIsShow}
                            setItemToUpDate={setItemToUpDate}
                            showDeleteConfirm={showDeleteConfirm}
                          /> : ""
                      )
                    }
                  </div>

                </Card>
              </div>
            </div>

          </div>
          <div className="col-2" style={{ borderLeft: "1px solid", borderColor: "#E3E4E6" }}>
            <div className="row" style={{ padding: "30px" }}>
              <div className="col-12">
                <div class="widget widget_ask row form">
                  <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => setCreateNewPostIsShow(true)}>Tạo Bài Đăng Mới</button>
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

        </div>
        <CreateNewPost
          setCreateNewPostIsShow={setCreateNewPostIsShow}
          visible={createNewPostIsShow}
          onCreatePost={onCreatePost}
        />
        <EditPost visible={updatePostIsShow} onUpdatePost={onUpdatePost} setUpdatePostIsShow={setUpdatePostIsShow} item={itemToUpdate} />
      </>
    );
  }
  else {
    return (
      <Result
        title="Bạn chưa vào nhóm này. Gửi yêu cầu tham gia?"
        extra={
          <Button type="primary" key="Yêu cầu">
            Yêu cầu
      </Button>
        }
      />
    )
  }
}

export default Posts;