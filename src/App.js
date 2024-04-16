import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AgeCounter from "./Component/Age";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/age" element={<AgeCounter />} />
      </Routes>
    </>
  );
}

export default App;
