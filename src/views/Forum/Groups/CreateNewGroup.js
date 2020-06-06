import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import { Form, Input, InputNumber, Select,Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined,UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};



export const CreateNewGroup = (props) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState();
    const [url, setUrl] = useState(null);
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
                title="Tạo Mới Nhóm"
                okText="Create"
                cancelText="Cancel"
                onCancel={() => {
                    form.resetFields();
                    props.handleCreateModalCancelClick();
                }
                }
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            form.resetFields();
                            props.onCreateGroup({
                                imgUrl: url === null ? "" : url,
                                groupName: values.groupName,
                                groupDes: values.description,
                                groupType : values.groupType
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
                        groupName: "",
                        description: "",
                        groupType:"1"
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
                    <Form.Item label="Loại: " name="groupType" hasFeedback >
                        <Select>
                            {
                                props.listTypeOfGroup.map(item=>
                                    item !== undefined ?   <Option key={"grptype" + item.id} value={item.id}>{item.typeName}</Option>   : ""
                                )
                            }
 
                        </Select>
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
export default CreateNewGroup;
