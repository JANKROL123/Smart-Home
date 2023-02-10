import ComponentList from "./components/ComponentsList";
import ComponentParams from "./components/ComponentParams";
import UserContext from "./components/context/UserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import { theme, ConfigProvider } from "antd";
import { Header, Footer } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
function App() {
    const navigate = useNavigate();
    const { darkAlgorithm } = theme;
    const [user, setUser] = useState(null);
    const providerValue = useMemo(() => ({user, setUser}), [user, setUser]);
    return (
        <ConfigProvider theme={{algorithm:  darkAlgorithm}}>
            <Header>
                <Title level={1}>Smart Home Panel</Title>
                {user ? <div onClick={() => navigate("/user", {replace: true})} id="userLogo">{user[0].toUpperCase()}</div> : null}
            </Header>
            <UserContext.Provider value={providerValue}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/list" element={<ComponentList />} />
                    <Route path="/params/:elem" element={<ComponentParams />} />
                    <Route path="/user" element={<UserHome />} />
                </Routes>
            </UserContext.Provider>
            <Footer>
                &copy; Jan Król - PSW 2023
            </Footer>
        </ConfigProvider>
    )
}
export default App;

