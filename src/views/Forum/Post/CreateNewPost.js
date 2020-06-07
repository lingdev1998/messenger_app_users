import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import { Form, Input, Upload } from 'antd';
import {  UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
const { TextArea } = Input;
// const layout = {
//     labelCol: {
//         span: 4,
//     },
//     wrapperCol: {
//         span: 16,
//     },
// };
// const validateMessages = {
//     required: '${label} is required!',
//     types: {
//         email: '${label} is not validate email!',
//         number: '${label} is not a validate number!',
//     },
//     number: {
//         range: '${label} must be between ${min} and ${max}',
//     },
// };



export const CreateNewPost = (props) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState();
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        form.resetFields();
    }, []);

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
                title="Create Post"
                okText="Create"
                cancelText="Cancel"
                onCancel={() => {
                    form.resetFields();
                    props.setCreateNewPostIsShow();
                }
                }
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            form.resetFields();
                            props.onCreatePost({
                                imgUrl: url ,
                                postTitle: values.postTitle,
                                content: values.content,
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
                        postTitle: "",
                        content: "",
                    }}
                >
                    <Form.Item
                        name="postTitle"
                        label="Title: "
                        rules={[
                            {
                                required: true,
                                message: 'Please input the title of post!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label="Content: "
                        rules={[
                            {
                                required: true,
                                message: 'Please input the content of post!',
                            },
                        ]}
                    >
                        <TextArea rows={4} />
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
export default CreateNewPost;
