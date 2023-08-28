
import reactLogo from "./assets/react.svg";
import "./App.css";
import "./styles/app.less";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ConfigProvider, message, theme } from "antd";
import { LayoutPage } from "./pages/app/Layout";
import { UserLoginPage } from "./pages/app/user/login";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path={"/login"} element={<UserLoginPage />} />
          <Route path={"/"} element={<Navigate to={"/app"} />} />
          <Route index path={"/*"} element={<LayoutPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
