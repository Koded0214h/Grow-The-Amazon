import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Forest from "./pages/Forest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/forest" element={<Forest />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;