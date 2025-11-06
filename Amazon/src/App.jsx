import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Forest from "./pages/Forest";
import OurImpact from "./pages/OurImpact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/forest" element={<Forest />} />
        <Route path="/impact" element={<OurImpact />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;