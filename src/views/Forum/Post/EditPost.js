import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Input, Upload, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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
                title="Edit Post"
                okText="Update"
                cancelText="Cancel"
                onCancel={() => {
                    props.setUpdatePostIsShow(false);
                }
                }
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            form.resetFields();
                            props.onUpdatePost({
                                postId: props.item !== undefined ? props.item.id : "",
                                imgUrl: url === "" ? item.postImgUrl : url,
                                postTitle: values.postTitle,
                                postContent: values.postContent
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
                        postTitle: props.item !== undefined ? props.item.post_title : "",
                        postContent: props.item !== undefined ? props.item.post_content : ""
                    }}
                >
                    <Form.Item
                        name="postTitle"
                        label="Post Title: "
                        rules={[
                            {
                                required: true,
                                message: 'Please input the title of collection!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="postContent"
                        label="Post Content: "
                        rules={[
                            {
                                required: true,
                                message: 'Please input the title of collection!',
                            },
                        ]}
                    >
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
