import { Content } from "antd/es/layout/layout";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import Title from "antd/es/typography/Title";
function UserHome() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get(`https://localhost:5000/users/${user}`).then(res => {
            setData(res.data);
        });
    }, []);
    async function deleteAccount() {
        try {
            await axios.delete(`https://localhost:5000/users/${data._id}`);
            navigate("/", {replace: true});
            setUser(null);
        } catch (err) {
            message.error(err.message);
        }
    }
    function logOut() {
        navigate("/", {replace: true});
        setUser(null);
    }
    return (
        <Content>
            <Title level={2}>User details</Title>
            {data ? <div><strong>Login: </strong>{data.login}</div> : null}
            {data ? <div><strong>Added: </strong>{data.added.slice(0,10)}</div> : null}
            <Button onClick={() => navigate("/list", {replace: true})} style={{"backgroundColor": "#15325b", "width": "15em"}}>Back to list</Button>
            <Button onClick={() => logOut()} style={{"backgroundColor": "#aa9514", "width": "15em"}}>Log out</Button>
            {data ? <Button onClick={() => deleteAccount()} style={{"backgroundColor": "#58181c", "width": "15em"}}>Delete account</Button> : null}
        </Content>
    )
}
export default UserHome;