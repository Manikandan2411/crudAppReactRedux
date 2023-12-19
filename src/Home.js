import React, { useState } from 'react'
import {Button, Row, Table, Typography,Form,Input,Modal} from "antd"
import { useSelector } from 'react-redux';
import {DeleteOutlined,EditOutlined} from "@ant-design/icons"
import { addUser, deleteUser } from './UserReducer';
import { useDispatch } from 'react-redux';

export default function Home(props) {
  const dispatch = useDispatch()
    const users = useSelector((state)=>state.users)

    console.log("users",users)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [delegteid , setDeleteid] = useState("")
    const showModal = () => {
        setIsModalVisible(true);
      };
    const showEditModal = (user) => {
      console.log("edit values",user)
      setSelectedUser(user)
        // setSelectedUser(user);
        setIsEditModalVisible(true);
      };
      const showDeleteModal = (user) => {
        setDeleteid(user)
        // setSelectedUser(user);
        // handleDelete(user)

        setIsDeleteModalVisible(true);
      };
      const handleCancel = () => {
        setIsModalVisible(false);
        setIsEditModalVisible(false);
        setIsDeleteModalVisible(false);
      };
const { Title } = Typography;
const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width:100
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width:100
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width:200
    },
    {
        title: 'Action',
        dataIndex: 'id',
        key: 'action',
        width:100,
        render: (value, record, index) => {
            return (
            <span style={{display:"flex",gap:"7px"}}>
            <EditOutlined style={{color:"green"}} onClick={() => showEditModal(record)}/> 
            <DeleteOutlined style={{color:"red"}}  onClick={() => showDeleteModal(record)}/> 
              </span>
            );
          },
      },
  ];
  const AddonFinish=(value)=>{
    console.log("value",value)
    let name = value.name
    let email = value.email
    let id = users[users.length -1].id + 1
    console.log(id)
  dispatch(addUser({name,email,id}))
  setIsModalVisible(false);
  props.form.resetFields();
  // props.form.setFieldsValue({name:"",email:""})

  }
  const handleDelete = ()=>{
  
    dispatch(deleteUser({id : delegteid.id}))
    setIsDeleteModalVisible(false);
  }
  console.log(selectedUser,"selectuser")
  const onFinishEdit =(value)=>{
  console.log("editvalue",value)
  }
  return (
    <div>
    <Title level={2}>
     practice crud with react and redux
    </Title>
    <Row style={{display:"flex",justifyContent:"end",position:"relative",right:"10%"}}>
     <Button style={{background:"green",color:"white"}} onClick={showModal}>
      Add User +  
     </Button>
     </Row >
     <Table style={{padding:"30px"}}
     columns={columns}
     dataSource={users}
     />
       <Modal title="Add User" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          name="addUserForm"
          onFinish={AddonFinish}
          form ={props.form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input the name!',
              },
            ]}
          >
            <Input  />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input the email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Edit User" open={isEditModalVisible} onCancel={handleCancel} footer={null}>
        <Form name="editUserForm" 
        form={props.form}
        onFinish={onFinishEdit} 
        initialValues={selectedUser}
        >
           <Form.Item hidden  name="id">
            <Input value={selectedUser?.id} />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input value={selectedUser?.name} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input value={selectedUser?.email}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Delete User"
        open={isDeleteModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <p>Are you sure you want to delete this user?</p>
        <Button type="primary" danger onClick={handleDelete}
        // onClick={onFinishDelete}
        >
          Delete
        </Button>
      </Modal>
    </div>
  )
}
