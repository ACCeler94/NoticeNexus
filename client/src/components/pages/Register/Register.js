import TextField from '@mui/material/TextField';
import styles from './Register.module.scss';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { AUTH_URL } from '../../../API/config';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // null, loading, success, serverError, clientError, loginError

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('phoneNumber', phoneNumber);
    fd.append('avatar', avatar);

    const options = {
      method: 'POST',
      body: fd
    }

    setStatus('loading')
    fetch(`${AUTH_URL}/register`, options)
      .then(res => {
        if (res.status === 201) {
          setStatus('success');
        } else if (res.status === 400) {
          setStatus('clientError');
        } else if (res.status === 409) {
          setStatus('loginError');
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
      <h2>Sign Up</h2>
      <form className={styles.form} onSubmit={handleSubmit}>

        {status === 'loading' && (<CircularProgress />)}

        {status === 'serverError' && (<Alert severity="error">Unexpected Error! Try again...</Alert>)}

        {status === 'clientError' && (<Alert severity="error">You need to fill all the fields</Alert>)}

        {status === 'loginError' && (<Alert severity="warning">Login already in use!</Alert>)}

        {status === 'success' && (<Alert severity="success">You have been successfully registered. You can now log in.</Alert>)}

        <TextField id="login" label="Login" variant="outlined" sx={{ margin: '5px 0' }} value={login} onChange={e => setLogin(e.target.value)} required />

        <TextField id="password" label="Password" variant="outlined" type="password" sx={{ margin: '5px 0' }} value={password} onChange={e => setPassword(e.target.value)} required />

        <TextField id="phoneNumber" label="Phone Number" variant="outlined" type="tel" sx={{ margin: '5px 0' }} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />

        <TextField id="avatar" variant="outlined" type="file" helperText="Select Your Avatar" sx={{ margin: '5px 0' }} onChange={e => setAvatar(e.target.files[0])} required />

        <Button type='submit' variant='contained' sx={{ maxWidth: '100px', marginTop: '30px' }}>Submit</Button>
      </form>
    </div>
  )
}


export default Register;