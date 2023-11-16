import TextField from '@mui/material/TextField';
import styles from './Login.module.scss';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { AUTH_URL } from '../../../API/config';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { logIn } from '../../features/Users/usersSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // null, loading, success, serverError, clientError
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password })
    }

    setStatus('loading')
    fetch(`${AUTH_URL}/login`, options)
      .then(res => {
        const status = res.status;
        return res.json().then(data => ({ status, data }));
      })
      .then(({ status, data }) => {
        if (status === 200) {
          setStatus('success');
          dispatch(logIn({ login, id: data.id }));
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else if (status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      })
  }

  return (
    <div className={styles.formWrapper}>
      <h2>Sign In</h2>
      <form className={styles.form} onSubmit={handleSubmit}>

        {status === 'loading' && (<CircularProgress />)}

        {status === 'serverError' && (<Alert severity="error">Unexpected Error! Try again...</Alert>)}

        {status === 'clientError' && (<Alert severity="error">Incorrect login or password!</Alert>)}

        {status === 'success' && (<Alert severity="success">You have been successfully signed in.</Alert>)}

        <TextField id="login" label="Login" variant="outlined" sx={{ margin: '5px 0' }} value={login} onChange={e => setLogin(e.target.value)} required />

        <TextField id="password" label="Password" variant="outlined" type="password" sx={{ margin: '5px 0' }} value={password} onChange={e => setPassword(e.target.value)} required />

        <Button type='submit' variant='contained' sx={{ maxWidth: '100px', marginTop: '30px' }}>Submit</Button>
      </form>
    </div>
  )
};

export default Login;