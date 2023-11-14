import { Routes, Route } from "react-router-dom";
import SearchAppBar from './components/layout/SearchAppBar/SearchAppBar';
import Home from './components/pages/Home/Home';
import SingleAd from './components/features/SingleAd/SingleAd';
import Register from './components/pages/Register/Register';

function App() {
  return (
    <>
      <SearchAppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ads/:id' element={<SingleAd />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
