import UserContext from "./context/UserContext";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { useEffect, useState, useContext } from "react";
import {Form, Input, Button, message} from "antd";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [usersStatus, setUsersStatus] = useState(false);
    const [exists, setExists] = useState(true);
    const {setUser} = useContext(UserContext);
    useEffect(() => {
        axios.get("https://localhost:5000/users").then(res => setUserList(res.data));
    }, []);
    async function handleUser(data) {
        if (exists) {
            const checkUser = await axios.post("https://localhost:5000/users/login", data);
            if (checkUser.data.msg === "COMPONENT_DOES_NOT_EXIST") {
                message.error("Incorrect login or password");
                return;
            }
            setUser(checkUser.data);
            navigate("/list", {replace: true});
        } else {
            const addUser = await axios.post("https://localhost:5000/users", data);
            if (addUser.data.msg === "COMPONENT_ALREADY_EXISTS") {
                message.error("User already exists");
                return;
            }
            setUser(addUser.data);
            navigate("/list", {replace: true});
        }
    }
    return (
        <Content>
            <Title level={2}>Log in</Title>
            <div id="btns">
                <Button id="logBtn" type="primary" onClick={() => setExists(!exists)} style={exists ? {"backgroundColor": "#274916"} : {"backgroundColor": "#15325b"}}>
                    {exists ? "Create account" : "Already have"}
                </Button>
                <Button id="userShow" type="primary" style={{"backgroundColor": "#15325b"}} onClick={() => setUsersStatus(!usersStatus)}>
                    Show user list
                </Button>
            </div>
            <Form onFinish={(data) => handleUser(data)}>
                <Form.Item label="Login" name="login" rules={[{required: true, message: "User login required!"}]}>
                    <Input style={{"width": "30%"}} />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{required: true, message: "User password required!"}]}>
                    <Input.Password style={{"width": "30%"}} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{"backgroundColor": "#15325b"}}>Submit</Button>
                </Form.Item>
            </Form>
            {userList && usersStatus ? <UserList userList={userList} hide={() => setUsersStatus(!usersStatus)} /> : null}
        </Content>
    )
}
export default Login;