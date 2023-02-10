import mqtt from "precompiled-mqtt";
import { useEffect, useState } from "react";
function MqttSubscriber({elem}) {
    const [message, setMessage] = useState("-");
    useEffect(() => {
        const client = mqtt.connect("ws://localhost:8000");
        const elemToList = elem.split("-");
        const place = elemToList[elemToList.length-1];
        client.on("connect", () => {
            switch (elemToList.slice(0,-1).join("-")) {
                case "anti-fire-alarm":
                    client.subscribe("fire");
                    break;
                case "fertilize-system":
                    client.subscribe(`fertilizers/${place}`);
                    break;
                case "human-presence-detector":
                    client.subscribe(`presence/${place}`);
                    break;
                case "internet-switch":
                    client.subscribe("internet");
                    break;
                case "light-switch":
                    client.subscribe(`light/${place}`);
                    break;
                case "rain-detector":
                    client.subscribe("rain");
                    break;
                case "security-alarm":
                    client.subscribe("alarm");
                    break;
                case "temperature-sensor":
                    client.subscribe(`temperature/${place}`);
                    break;
                case "watering-system":
                    client.subscribe(`water/${place}`);
                    break;
                case "windows-opening-system":
                    client.subscribe(`windows/${place}`);
                    break;
                default:
                    break;
            }
        });
        client.on("message", (topic, message) => {
            switch (topic) {
                case `temperature/${place}`:
                    setMessage(parseFloat(message).toFixed(2));
                    break;
                case `windows/${place}`:
                    setMessage(message.toString());
                    break;
                case "rain":
                    const status = message.toString() === "true";
                    status ? setMessage("rain") : setMessage("no rain");
                    break;
                case `water/${place}`:
                    setMessage(parseFloat(message).toFixed(2));
                    break;
                case `fertilizers/${place}`:
                    setMessage(parseFloat(message).toFixed(2));
                    break
                case "fire":
                    setMessage(message.toString());
                    break;
                case `presence/${place}`:
                    setMessage(message.toString());
                    break;
                case "alarm":
                    setMessage(message.toString());
                    break;
                case "internet":
                    setMessage(message.toString());
                    break;
                case `light/${place}`:
                    setMessage(message.toString());
                    break;
                default:
                    setMessage(message.toString());
                    break;
            }
        });
    }, []);
    return (
        <div><strong>Info: </strong>{message}</div>
    )
}
export default MqttSubscriber;