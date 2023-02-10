import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ListElem from "./ListElem";
import AddComponentsBar from "./AddComponentsBar";
import UserContext from "./context/UserContext";
import { Content } from "antd/es/layout/layout";
import { Card, Col, Result, Row } from "antd";
import Title from "antd/es/typography/Title";
function ComponentList() {
    const {user} = useContext(UserContext);
    const [components, setComponents] = useState([]);
    function addNewComponent(newComponent) {
        setComponents([...components, newComponent]);
    }
    useEffect(() => {
        axios.get("https://localhost:5000").then(res => {
            setComponents(res.data);
        });
    }, []);
    async function deleteComponent(toDel) {
        try {
            setComponents(components.filter(n => n !== toDel));
            await axios.delete(`https://localhost:5000/delete/${toDel}`);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <Content>
            {user ? <Row gutter={6}>
                <Col span={8}>
                    <Title>Inside</Title>
                    <Card>
                        <Title level={3}>Bedroom</Title>
                        <Row gutter={3}>
                            <Col span={12}>
                                <AddComponentsBar add={addNewComponent} place={"bedroom"} inside={true} />
                            </Col>
                            <Col span={12} className="components">
                                {components.filter(elem => elem.includes("bedroom")).map((elem) => <ListElem key={elem} elem={elem} deleteComponent={deleteComponent} />)}
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Title level={3}>Bathroom</Title>
                        <Row gutter={3}>
                            <Col span={12}>
                                <AddComponentsBar add={addNewComponent} place={"bathroom"} inside={true} />
                            </Col>
                            <Col span={12} className="components">
                                {components.filter(elem => elem.includes("bathroom")).map((elem) => <ListElem key={elem} elem={elem} deleteComponent={deleteComponent} />)}
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Title level={3}>Kitchen</Title>
                        <Row gutter={3}>
                            <Col span={12}>
                                <AddComponentsBar add={addNewComponent} place={"kitchen"} inside={true} />
                            </Col>
                            <Col span={12} className="components">
                                {components.filter(elem => elem.includes("kitchen")).map((elem) => <ListElem key={elem} elem={elem} deleteComponent={deleteComponent} />)}
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Title level={3}>Hall</Title>
                        <Row gutter={3}>
                            <Col span={12}>
                                <AddComponentsBar add={addNewComponent} place={"hall"} inside={true} />
                            </Col>
                            <Col span={12} className="components">
                                {components.filter(elem => elem.includes("hall")).map((elem) => <ListElem key={elem} elem={elem} deleteComponent={deleteComponent} />)}
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Title level={3}>Living Room</Title>
                        <Row gutter={3}>
                            <Col span={12}>
                                <AddComponentsBar add={addNewComponent} place={"livingroom"} inside={true} />
                            </Col>
                            <Col span={12} className="components">
                                {components.filter(elem => elem.includes("livingroom")).map((elem) => <ListElem key={elem} elem={elem} deleteComponent={deleteComponent} />)}
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={8}>
                    <Title>Outside</Title>
                    <Card>
                        <Title level={3}>Grass</Title>
                        <Row gutter={3}>
                            <Col span={12}>
                                <AddComponentsBar add={addNewComponent} place={"grass"} inside={false} />
                            </Col>
                            <Col span={12} className="components">
                                {components.filter(elem => elem.includes("grass")).map((elem) => <ListElem key={elem} elem={elem} deleteComponent={deleteComponent} />)}
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Title level={3}>Garden</Title>
                        <Row gutter={3}>
                            <Col span={12}>
                                <AddComponentsBar add={addNewComponent} place={"garden"} inside={false} />
                            </Col>
                            <Col span={12} className="components">
                                {components.filter(elem => elem.includes("garden") && !elem.includes("single")).map((elem) => <ListElem key={elem} elem={elem} deleteComponent={deleteComponent} />)}
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={8}>
                    <Title>Special</Title>
                    <Card>
                        <Title level={3}>Single components</Title>
                        <Row gutter={3}>
                            <Col span={12}>
                                <AddComponentsBar add={addNewComponent} place={"single"} inside={true} />
                            </Col>
                            <Col span={12} className="components">
                                {components.filter(elem => elem.includes("single")).map((elem) => <ListElem key={elem} elem={elem} deleteComponent={deleteComponent} />)}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row> : <Result
                status="error"
                title="Permission denied"
                subTitle="You must be logged in"
            />}
        </Content>
    )
}
export default ComponentList;

