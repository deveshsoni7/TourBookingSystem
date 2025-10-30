import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/checkout/:id" element={<Checkout />} />
      {/* Key for direct success bookingid route */}
      <Route path="/result/success/:bookingId" element={<Result />} />
      {/* fallback: result with status (success/failure) and optional bookingId */}
      <Route path="/result/:status/:bookingId?" element={<Result />} />
    </Routes>
  );
}

export default App;
