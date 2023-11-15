import { AUTH_URL } from '../../../API/config';
import { useDispatch } from 'react-redux';
import { logOut } from '../../features/Users/usersSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE'
    }

    fetch(`${AUTH_URL}/logout`, options)
      .then(() => {
        dispatch(logOut());
        navigate('/');
      })
  }, [dispatch, navigate])


  return (
    null
  )
}


export default Logout;