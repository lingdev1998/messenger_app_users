
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane, Input, Label } from 'reactstrap';
import './GroupList.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { Tag } from 'antd';
import {
    UserOutlined,
    UsergroupAddOutlined,
    EditTwoTone
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Menu, Dropdown, message } from 'antd';
import EditGroup from "./EditGroup";
import axios from 'axios';





export const GroupList = (props) => {
    const [listGroup, setListGroup] = useState([]);
    const state = useSelector(state => state.user.userInfo);
    const [editGroupIsLoading, setEditGroupIsLoading] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(undefined);

    const handleEditModalSubmitClick = () => {
        setEditGroupIsLoading(true);
        setTimeout(() => {
            setEditGroupIsLoading(false);
            props.setEditGroupIsShow(false);
        }, 3000);
    }
    const showEditGroup = (item) => {
        console.log(item);
        setItemToEdit({...item});
        props.setEditGroupIsShow(true);
    }
    const handleEditModalCancelClick = () => {
        props.setEditGroupIsShow(false);
    }
    useEffect(() => {
        setListGroup(props.listGroup);
    }, [props.listGroup]);
    return (
        <>
            <div className="row no-gutters"  >
                <div className="col-12" style={{ padding: "10px 50px" }}>
                    <Card className="text-center">

                        <ListGroup>
                            {listGroup.map(item =>
                                item !== undefined ? <ListGroupItem className="justify-content-between">

                                    <div className="listGroupItem row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-2">
                                                    <div className="clearFix-img">
                                                        <a href="#"><img src={item.group_avatar} width="60px" height="60px"></img></a>
                                                    </div>
                                                </div>
                                                <div className="col-5">
                                                    <div className="clearFix-content">
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <Link to={"/group/" + item.id}>{item.group_name}</Link>

                                                            </div>
                                                            <div className="row">
                                                                <small>{item.group_description}</small>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="-col-2">
                                                    <div className="row no-gutters">
                                                        <div className="col-12">
                                                            <Tag icon={<UsergroupAddOutlined />} color="#55acee">
                                                                Total Member: {item.totalMember}
                                                            </Tag>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-2">
                                                    <div className="row no-gutters">

                                                        <div className="col-12">
                                                            {
                                                                item.adminId === state.id ?
                                                                    <Tag icon={<UserOutlined />} color="#55acee">
                                                                        Your Group
                                                              </Tag> : ""
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-1">
                                                    <div className="row no-gutters">
                                                        <div className="col-12">
                                                            {
                                                                item.adminId === state.id ?
                                                                    <>

                                                                        <Dropdown overlay={(
                                                                            <Menu >
                                                                                <Menu.Item key="1" onClick={() => showEditGroup(item)} icon={<UserOutlined />}>
                                                                                    Chỉnh Sửa
                                                                                    </Menu.Item>
                                                                                <Menu.Item key="2" icon={<UserOutlined />}>
                                                                                    Rời Khỏi
                                                                                    </Menu.Item>
                                                                                <Menu.Item key="3" onClick={() => props.showDeleteConfirm(item)} icon={<UserOutlined />}>
                                                                                    Xoá
                                                                                </Menu.Item>
                                                                            </Menu>
                                                                        )}>
                                                                            <EditTwoTone />
                                                                        </Dropdown>

                                                                    </>

                                                                    : ""


                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </ListGroupItem> : ""
                            )}

                        </ListGroup>
                    </Card>
                </div>
                <EditGroup
                    item={itemToEdit}
                    onUpdateGroup={props.onUpdateGroup}
                    handleEditModalSubmitClick={handleEditModalSubmitClick}
                    handleEditModalCancelClick={handleEditModalCancelClick}
                    visible={props.editGroupIsShow} loading={editGroupIsLoading}
                />
            </div>
        </>
    );
}

export default GroupList;