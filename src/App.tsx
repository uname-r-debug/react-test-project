import { Route, Routes } from "react-router";
import { LoginForm } from "./components/login-form";
import "./App.css";
import CenterXY from "./components/anchor/Center";
import Index from "./components/index";
export default function App(): React.JSX.Element {
  return (
    <Routes>
      <Route
        path="/"
        element={CenterXY({
          element: <LoginForm className="w-[20%]" />,
          y: "min-h-screen",
        })}
      />
      <Route path="/index" element={<Index />} />
    </Routes>
  );
}
