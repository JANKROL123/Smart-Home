import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import { message, Button, InputNumber } from "antd";
function ComponentParams() {
    const params = useParams();
    const [properties, setProperties] = useState([]);
    const [high, setHigh] = useState(0);
    const [low, setLow] = useState(0);
    const [highWater, setHighWater] = useState(0);
    const [lowWater, setLowWater] = useState(0);
    const [highFertilizers, setHighFertilizers] = useState(0);
    const [lowFertilizers, setLowFertilizers] = useState(0);
    const [amp, setAmp] = useState(0);
    useEffect(() => {
        axios.get(`https://localhost:5000/read/${params.elem}`).then(res => {
            setProperties(res.data);
        });
    }, []);
    async function newHigh(x) {
        const updated = x || 0;
        try {
            setProperties({...properties, high: updated});
            await axios.put(`https://localhost:5000/set/high/${properties.id}/${updated}`);
        } catch (err) {
            message.error(err.message);
        }
    }
    async function newLow(x) {
        const updated = x || 0;
        try {
            setProperties({...properties, low: updated});
            await axios.put(`https://localhost:5000/set/low/${properties.id}/${updated}`);
        } catch (err) {
            message.error(err.message);
        }
    }
    async function setAmplitude(x) {
        const amplitude = x || 0;
        try {
            setProperties({...properties, amplitude});
            await axios.put(`https://localhost:5000/set/amplitude/${properties.id}/${amplitude}`);
        } catch (err) {
            message.error(err.message);
        }
    }
    async function newHighWater(x) {
        const amplitude = x || 0;
        try {
            setProperties({...properties, highWater: amplitude});
            await axios.put(`https://localhost:5000/set/garden/water/high/${amplitude}`);
        } catch (err) {
            message.error(err.message);
        }
    }
    async function newLowWater(x) {
        const amplitude = x || 0;
        try {
            setProperties({...properties, lowWater: amplitude});
            await axios.put(`https://localhost:5000/set/garden/water/low/${amplitude}`);
        } catch (err) {
            message.error(err.message);
        }
    }
    async function newHighFertilizers(x) {
        const amplitude = x || 0;
        try {
            setProperties({...properties, highFertilizers: amplitude});
            await axios.put(`https://localhost:5000/set/garden/fertilizers/high/${amplitude}`);
        } catch (err) {
            message.error(err.message);
        }
    }
    async function newLowFertilizers(x) {
        const amplitude = x || 0;
        try {
            setProperties({...properties, lowFertilizers: amplitude});
            await axios.put(`https://localhost:5000/set/garden/fertilizers/low/${amplitude}`);
        } catch (err) {
            message.error(err.message);
        }
    }
    return (
        <Content>
            <div className="data">{Object.entries(properties).map((elem,idx) => <div key={idx}><strong>{elem[0]}: </strong>{elem[1]}</div>)}</div>
            <Link to="/list"><Button className="paramsBack">Back</Button></Link>
            {properties.setFunctions && params.elem !== "garden-management-system-single" ? <div className="inputs">
                <div>
                    <label>High: </label>
                    <InputNumber defaultValue={high} onChange={(e) => setHigh(e)} step={0.01}/>
                    <Button className="paramsBack" onClick={() => newHigh(high)}>Set</Button>
                </div>
                <div>
                    <label>Low: </label>
                    <InputNumber defaultValue={low} onChange={(e) => setLow(e)} step={0.01}/>
                    <Button className="paramsBack" onClick={() => newLow(low)}>Set</Button>
                </div>
            </div> : null}
            {properties.ampFunctions ? <div className="inputs">
                <label>Amplitude: </label>
                <InputNumber defaultValue={amp} onChange={(e) => setAmp(e)} step={0.01}/>
                <Button className="paramsBack" onClick={() => setAmplitude(amp)}>Set</Button>
            </div> : null}
            {params.elem === "garden-management-system-single" ? <div className="inputs">
                <div>
                    <label>High water: </label>
                    <InputNumber defaultValue={highWater} onChange={(e) => setHighWater(e)} step={0.01}/>
                    <Button className="paramsBack" onClick={() => newHighWater(highWater)}>Set</Button>
                </div>
                <div>
                    <label>Low water: </label>
                    <InputNumber defaultValue={lowWater} onChange={(e) => setLowWater(e)} step={0.01}/>
                    <Button className="paramsBack" onClick={() => newLowWater(lowWater)}>Set</Button>
                </div>
                <div>
                    <label>High fertilizers: </label>
                    <InputNumber defaultValue={highFertilizers} onChange={(e) => setHighFertilizers(e)} step={0.01}/>
                    <Button className="paramsBack" onClick={() => newHighFertilizers(highFertilizers)}>Set</Button>
                </div>
                <div>
                    <label>Low fertilizers: </label>
                    <InputNumber defaultValue={lowFertilizers} onChange={(e) => setLowFertilizers(e)} step={0.01}/>
                    <Button className="paramsBack" onClick={() => newLowFertilizers(lowFertilizers)}>Set</Button>
                </div>
            </div> : null}
        </Content>
    )
}
export default ComponentParams;
