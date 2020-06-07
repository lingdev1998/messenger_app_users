import React, { useState, useEffect, useReducer } from 'react';
import GroupList from './Groups/GroupsList';
import GroupTypeList from './Groups/GroupTypeList';
import axios from 'axios';
import "./index.scss";
import CreateNewGroup from './Groups/CreateNewGroup';
import 'antd/dist/antd.css';
 import { Modal  } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;




export const Forum = () => {

    const [listGroup, setListGroup] = useState([]);
    const [listTypeOfGroup, setListTypeOfGroup] = useState([]);

    const [currentRangeRadio, setCurrentRangeRadio] = useState('getAllGroups');
    const [checkAllStatus, setCheckAllStatus] = useState(true);
    const [strBd, setStrBd] = useState("");
    const [keySearch, setKeySearch] = useState("");

    const [editGroupIsShow, setEditGroupIsShow] = useState(false);
    const [createGroupIsShow, setCreateGroupIsShow] = useState(false);
    const [_count, forceUpdate] = useReducer(x => x + 1, 0);








    useEffect(() => {
        axios.post("/groups/getAllGroups").then(response => setListGroup(response.data));
        axios.get("/groups/getAllTypesGroup").then(response => {
            response.data.forEach(function (element) {
                element.isChecked = true;
            });
            setListTypeOfGroup(response.data)
        });
    }, [_count])


    const onUpdateGroup = values => {
        console.log('Received values of form: ', values);
        var formData = new FormData();
        formData.append("groupId", values.groupId);
        formData.append("groupName", values.groupName);
        formData.append("groupDes", values.groupDes);
        formData.append("imgUrl", values.imgUrl);
        axios.post("/groups/updateGroup", formData).then(response => forceUpdate());
        setEditGroupIsShow(false);
    };

    const handleCreateModalCancelClick = () => {
        setCreateGroupIsShow(false);
    }

    const onCreateGroup = (values) => {
        console.log('Received values of form: ', values);
        var formData = new FormData();
        formData.append("grouptTypeId", values.groupType);
        formData.append("groupName", values.groupName);
        formData.append("groupDescription", values.groupDes);
        formData.append("imgUrl", values.imgUrl);
        axios.post("/groups/createGroup", formData).then(response => forceUpdate());
        setCreateGroupIsShow(false);
    }


    const  showDeleteConfirm = (item) => {
        confirm({
          title: 'Bạn chắc chắn muốn xoá nhóm này?',
          icon: <ExclamationCircleOutlined />,
          content: 'Đây là nhóm của bạn, bạn làm gì tuỳ bạn nha',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log(item);
            onDeleteGroup(item);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }



    const handleChangeKeySearch = e => {
        setKeySearch(e.target.value);
        var formData = new FormData();
        formData.append("keySearch", e.target.value);
        if (strBd !== "") {
            formData.append("type", strBd);
        }
        if (currentRangeRadio === "getAllGroups") {
            axios.post("/groups/getAllGroups", formData).then(response => setListGroup(response.data));
        }
        else if (currentRangeRadio === "getAllGroupJoined") {
            axios.post("/groups/getAllGroupJoined", formData).then(response => setListGroup(response.data.data));

        }
    }
    const handleChangeRangeRadio = (e) => {
        setCurrentRangeRadio(e.currentTarget.value);
        if (e.currentTarget.value === "getAllGroups") {
            axios.post("/groups/getAllGroups").then(response => setListGroup(response.data));
        }
        else if (e.currentTarget.value === "getAllGroupJoined") {
            axios.post("/groups/getAllGroupJoined").then(response => setListGroup(response.data.data));

        }

    }

    const onDeleteGroup = (item) => {
         var formData = new FormData();
        formData.append("groupId", item.id);
        axios.post("/groups/deleteGroup", formData).then(response => forceUpdate());
    }


    const handleAllChecked = (event) => {
        let temp = [...listTypeOfGroup];
        setCheckAllStatus(event.target.checked);
        var tempStrBuider = "";
        var strBuilder = [];
        if (event.target.checked === true) {
            temp.forEach(t => {
                t.isChecked = event.target.checked;
                strBuilder.push(t.id);
            });
            tempStrBuider = strBuilder.join(", ");
            setStrBd(tempStrBuider);
            var formData = new FormData();
            formData.append("type", tempStrBuider);
            if (currentRangeRadio === "getAllGroups") {
                axios.post("/groups/getAllGroups", formData).then(response => setListGroup([...response.data]));
            }
            else {
                axios.post("/groups/getAllGroupJoined", formData).then(response => setListGroup([...response.data.data]));
            }
        }
        else {
            temp.forEach(t => {
                t.isChecked = event.target.checked;
            });
        }

        setListTypeOfGroup(temp);
    }
    const handleCheckBoxChangeStatus = (event) => {
        let temp = [...listTypeOfGroup];
        var flag = false;
        var tempStrBuider = "";
        var strBuilder = [];
        var flagAllIs = true;
        temp.forEach(t => {
            if (t.id === event.target.value)
                t.isChecked = event.target.checked;
            if (t.isChecked === false && checkAllStatus === true) setCheckAllStatus(false)
            if (t.isChecked === true) {
                flag = true;
                strBuilder.push(t.id);
            }
        });
        tempStrBuider = strBuilder.join(", ");
        setStrBd(tempStrBuider);
        setListTypeOfGroup(temp);
        if (flag === true) {
            var formData = new FormData();
            formData.append("type", strBuilder);
            if (currentRangeRadio === "getAllGroups") {
                axios.post("/groups/getAllGroups", formData).then(response => setListGroup([...response.data]));
            }
            else {
                axios.post("/groups/getAllGroupJoined", formData).then(response => setListGroup([...response.data.data]));
            }
        }
    }
    return (
        <>
            <div className="row no-gutters" style={{ padding: "30px", paddingTop: "0px" }}>
                {/* <p>Rendered {_count} times</p> */}
            </div>
            <div className="row no-gutters" style={{background:"white"}} >
                <div className="col-2" style={{borderRight:"1px solid", borderColor:"#E3E4E6"}}>
                    <GroupTypeList setCreateGroupIsShow={setCreateGroupIsShow} listType={listTypeOfGroup} checkAllStatus={checkAllStatus} handleAllChecked={handleAllChecked} handleCheckBoxChangeStatus={handleCheckBoxChangeStatus} handleChangeRangeRadio={handleChangeRangeRadio} currentRangeRadio={currentRangeRadio} />
                </div>
                <div className="col-8 forum " >
                    <div className="row no-gutters">
                        <div className="col-12">
                            <div className="input-group">
                                <input type="text" className="form-control" name="x" id="search" placeholder="Search" value={keySearch} onChange={e => handleChangeKeySearch(e)} />
                                <span className="input-group-btn">
                                    <button className="btn btn-primary" type="button">
                                        <span className="glyphicon glyphicon-search"><i className="fas fa-search"></i></span>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <GroupList 
                    editGroupIsShow={editGroupIsShow}
                     setEditGroupIsShow={setEditGroupIsShow} 
                     onUpdateGroup={onUpdateGroup} 
                     showDeleteConfirm={showDeleteConfirm}
                     listGroup={listGroup}
                      />

                </div>
                <div className="col-2"  style={{borderLeft:"1px solid", borderColor:"#E3E4E6"}}>
                    
                </div>
            </div>
            <CreateNewGroup 
            listTypeOfGroup={listTypeOfGroup} 
            visible={createGroupIsShow}
            handleCreateModalCancelClick={handleCreateModalCancelClick}
            onCreateGroup={onCreateGroup}
             />
        </>
    );
}

export default Forum;
