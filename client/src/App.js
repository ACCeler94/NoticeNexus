import { Routes, Route } from "react-router-dom";
import SearchAppBar from './components/layout/SearchAppBar/SearchAppBar';
import Home from './components/pages/Home/Home';
import SingleAd from './components/features/SingleAd/SingleAd';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import { useEffect } from 'react';
import { AUTH_URL } from './API/config';
import { useDispatch } from 'react-redux';
import { logIn } from './components/features/Users/usersSlice';
import Logout from './components/pages/Logout/Logout';
import Delete from './components/pages/Delete/Delete';
import AdForm from './components/features/AdForm/AdForm';

function App() {
  const dispatch = useDispatch();

  // [TODO] fix checking session on server

  // check if session on the server exist and restore it on the client side
  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include'
    }
    fetch(`${AUTH_URL}/user`, options)
      .then((res) => {
        console.log(res)
      });
  }, [])



  return (
    <>
      <SearchAppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ads/:id' element={<SingleAd />} />
        <Route path='/ads/:id/edit' element={<AdForm />} />
        <Route path='/ads/:id/delete' element={<Delete />} />
        <Route path='/ads/new' element={<AdForm />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
