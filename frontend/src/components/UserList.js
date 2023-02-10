import { Button, Card } from "antd";
import Title from "antd/es/typography/Title";
function UserList({userList, hide}) {
    return (
        <div id="userList">
            <Card style={{"position": "relative"}}>
                <Button id="hide" size="small" style={{"backgroundColor": "#a61d24"}} onClick={() => hide()}>Hide</Button>
                <Title level={4}>Existing user accounts</Title>
                {userList.map((elem,idx) => <div key={elem.id}>
                    {idx+1}. {elem.login}
                </div>)}
            </Card>
        </div>
    )
}
export default UserList;