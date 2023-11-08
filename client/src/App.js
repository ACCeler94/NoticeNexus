import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Navbar />
      <Route path='*' element={<Home />} />
    </Routes>
  );
}

export default App;
