import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TopicPage from "./pages/TopicPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Dashboard />} />

        <Route path="/topic/:category" element={<TopicPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
