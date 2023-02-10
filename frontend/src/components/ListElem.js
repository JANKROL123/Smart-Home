import MqttSubscriber from "./MqttSubscriber";
import axios from "axios";
import { useState } from "react";
import Title from "antd/es/typography/Title";
import { Card, Button } from "antd";
import { SettingFilled, DeleteFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function ListElem({elem, deleteComponent}) {
    const navigate = useNavigate();
    const [on, setOn] = useState(false);
    useEffect(() => {
        axios.put(`https://localhost:5000/switch/off/${elem}`);
    }, []);
    async function turn() {
        if (on) {
            try {
                await axios.put(`https://localhost:5000/switch/off/${elem}`);
            } catch (err) {
                alert(err.message);
            }
        } else {
            try {
                await axios.put(`https://localhost:5000/switch/on/${elem}`);
            } catch (err) {
                alert(err.message);
            }
        }
        setOn(!on);
    }
    function getName() {
        return elem.split("-").slice(0,2).join(" ");
    }
    return (
        <Card style={{"backgroundColor": "#252525"}}>
            <Title level={5}>{getName()}</Title>
            <div className="handleButtons">
                <Button className="del" size="small" onClick={() => deleteComponent(elem)}><DeleteFilled /></Button>
                <Button onClick={() => navigate(`/params/${elem}`, {replace: true})} disabled={on} className="upd" size="small"><SettingFilled /></Button>
                <Button size="small" style={on ? {"backgroundColor": "#791a1f"} : {"backgroundColor": "#274916"}} onClick={() => turn()}>{on ? "off" : "on"}</Button>
            </div>
            <MqttSubscriber elem={elem} />
        </Card>
    )
}
export default ListElem;