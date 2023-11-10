import { Routes, Route } from "react-router-dom";
import SearchAppBar from './components/layout/SearchAppBar/SearchAppBar';
import Home from './components/pages/Home/Home';

function App() {
  return (
    <>
      <SearchAppBar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
