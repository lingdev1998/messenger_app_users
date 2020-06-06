import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Input, InputNumber, Upload, Space, AliyunOSSUpload, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import MyUpload from './MyUpload';
import { Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';


export const EditGroup = (props) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState();
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [item, setItem] = useState(undefined);

    useEffect(() => {
        setItem(props.item);
        form.resetFields();
    }, [props.item]);

    const handleOnChange = ({ file, fileList, event }) => {
        console.log(file, fileList, event);
        //Using Hooks to update the state to the current filelist
        setFile(file);
        //filelist - [{uid: "-1",url:'Some url to image'}]
    };
    const uploadImage = options => {

        const { onSuccess, onError, file, onProgress } = options;
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        const fmData = new FormData();
        fmData.append("image", file);
        axios
            .post("/files/uploadSimpleFile", fmData, config)
            .then(res => {
                onSuccess(file);
                console.log(res.data.url);
                setUrl(res.data.url)
            })
            .catch(err => {
                const error = new Error('Some error');
                onError({ event: error });
            });
    }
    return (
        <div className="container">
            <Modal
                destroyOnClose={true}
                visible={props.visible}
                title="Cập Nhật Nhóm"
                okText="Update"
                cancelText="Cancel"
                onCancel={() => {
                    props.handleEditModalCancelClick();
                }
                }
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            form.resetFields();
                            props.onUpdateGroup({
                                groupId: item !== undefined ? item.id : "",
                                imgUrl: url === null ? item.group_avatar : url,
                                groupName: values.groupName,
                                groupDes: values.description
                            });
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        groupName: props.item !== undefined ? props.item.group_name : "",
                        description: props.item !== undefined ? props.item.group_description : ""
                    }}
                >
                    <Form.Item
                        name="groupName"
                        label="Tên Nhóm: "
                        rules={[
                            {
                                required: true,
                                message: 'Please input the title of collection!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô Tả: ">
                        <Input type="textarea" />
                    </Form.Item>

                </Form>
                <Upload
                    multiple={false}
                    name="logo"
                    customRequest={uploadImage}
                    onChange={handleOnChange}
                    listType="picture"
                    accept="image/*"
                >
                    <Button>
                        <UploadOutlined /> Click to upload
                        </Button>
                </Upload>

            </Modal>
        </div>
    );

}
export default EditGroup;
