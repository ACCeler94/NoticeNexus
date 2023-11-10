import axios from 'axios';

const usersAPI = {
  // get requests
  getCurrentUser: () => axios.get('auth/user'),
  // post requests
  loginUser: userData => axios.post('auth/login', userData),
  registerUser: userData => axios.post('auth/register', userData),
  // delete requests
  logoutUser: () => axios.delete('auth/logout')
}

export default usersAPI;