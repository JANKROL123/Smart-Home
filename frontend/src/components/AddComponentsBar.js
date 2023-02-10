import axios from "axios";
import { Button, message } from "antd";

function AddComponentsBar({add, place, inside}) {
    async function addSingleComponent(type) {
        try {
            await axios.post(`https://localhost:5000/add/single/${type}`);
            add(`${type}-${place}`);
        } catch {
            message.error("Already exists");
        }
    }
    async function addMultipleComponentInside(type) {
        console.log(place, type);
        try {
            await axios.post(`https://localhost:5000/add/multiple/inside/${place}/${type}`);
            add(`${type}-${place}`);
        } catch {
            message.error("Already exists");
        }
    }
    async function addMultipleComponentOutside(type) {
        try {
            await axios.post(`https://localhost:5000/add/multiple/outside/${place}/${type}`);
            add(`${type}-${place}`);
        } catch {
            message.error("Already exists");
        }
    }
    return (
        <div>
            {place !== "single" && inside ? <div className="buttons inside">
                <Button type="primary" onClick={() => addMultipleComponentInside("heat-system")}>Heat System</Button>
                <Button type="primary" onClick={() => addMultipleComponentInside("light-switch")}>Light Switch</Button>
                <Button type="primary" onClick={() => addMultipleComponentInside("temperature-sensor")}>Temperature Sensor</Button>
                <Button type="primary" onClick={() => addMultipleComponentInside("windows-opening-system")}>Windows Opening System</Button>
                <Button type="primary" onClick={() => addMultipleComponentInside("human-presence-detector")}>Human Presence Detector</Button>
            </div> : null}
            {place !== "single" && !inside ? <div className="buttons outside">
                <Button type="primary" onClick={() => addMultipleComponentOutside("fertilize-system")}>Fertilize System</Button>
                <Button type="primary" onClick={() => addMultipleComponentOutside("watering-system")}>Watering System</Button>
            </div> : null}
            {place === "single" ? <div className="buttons single">
                <Button type="primary" onClick={() => addSingleComponent("garden-management-system")}>Garden Management System</Button>
                <Button type="primary" onClick={() => addSingleComponent("anti-fire-alarm")}>Anti Fire Alarm</Button>
                <Button type="primary" onClick={() => addSingleComponent("rain-detector")}>Rain Detector</Button>
                <Button type="primary" onClick={() => addSingleComponent("security-alarm")}>Security Alarm</Button>
                <Button type="primary" onClick={() => addSingleComponent("internet-switch")}>Internet Switch</Button>
            </div> : null}
        </div>
    )
}
export default AddComponentsBar;