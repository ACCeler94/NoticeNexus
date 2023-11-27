import TextField from '@mui/material/TextField';
import styles from './AdForm.module.scss';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from "luxon";
import { useNavigate, useParams } from 'react-router-dom';
import { addNewAd, fetchById, resetCurrentAd, resetError, resetNewAdStatus, setError, updateAd } from '../Ads/adsSlice';
import { Alert } from '@mui/material';


//  fix editing ad adding posts only for logged users
const AdForm = () => {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  const params = useParams();
  const status = useSelector(state => state.ads.adFormStatus);
  const error = useSelector(state => state.ads.error);
  const navigate = useNavigate();
  const currentAd = useSelector(state => state.ads.currentAd);
  const { id } = params;

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(DateTime.now().toLocaleString());
  const [photo, setPhoto] = useState(null); // on edit server assigns old photo if no new photo is provided
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [seller, setSeller] = useState('');

  // update local state seller when user is loaded from the store or server
  useEffect(() => {
    if (user) {
      setSeller(user.id)
    }
  }, [user, seller])


  // if id exists then it means editing existing ad => fetch ad data
  useEffect(() => {
    if (id) {
      dispatch(fetchById(id));
    } else {
      dispatch(resetCurrentAd()) // if !id then it means new Ad => set current Ad and empty object to empty the form
    }
  }, [dispatch, id])

  useEffect(() => {
    if (user && currentAd && currentAd.seller && user.id !== currentAd.seller._id.toString()) {
      dispatch(setError({ message: 'You are not authorized to modify this Ad' }))
    } else {
      dispatch(resetError())
    }
    return () => {
      dispatch(resetError())
    }
  }, [user, currentAd, dispatch])



  // update local state if currentAd exists
  useEffect(() => {
    if (currentAd && Object.keys(currentAd).length !== 0) { // check if currentAd is an empty obj
      setTitle(currentAd.title)
      setDesc(currentAd.desc)
      setDate(currentAd.date)
      setPrice(currentAd.price)
      setLocation(currentAd.location)
    } else {
      setTitle('')
      setDesc('')
      setDate(DateTime.now().toLocaleString())
      setPrice('')
      setLocation('')
    }
  }, [currentAd])

  // redirect after 1 sec on success
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        navigate('/');
      }, 1000);

      return () => {
        clearTimeout(timer); //clear the timeout if the component unmounts before the redirection happens
        dispatch(resetNewAdStatus())
      }
    }
  }, [status, navigate, dispatch]);





  const handleSubmit = (e) => {
    e.preventDefault();

    const newAdData = new FormData();
    newAdData.append('title', title);
    newAdData.append('desc', desc);
    newAdData.append('date', date);
    newAdData.append('photo', photo);
    if (photo) newAdData.append('price', price);
    newAdData.append('location', location);
    newAdData.append('seller', seller)

    // check if id exists, if it does then dispatch updateAd if not then adNewAd
    if (id) {
      dispatch(updateAd({ id: id, newAdData: newAdData }))
      console.log(newAdData)
    } else {
      dispatch(addNewAd(newAdData))
    }
    // Reset form fields
    setTitle('');
    setDesc('');
    setPhoto(null);
    setPrice('');
    setDate(DateTime.now().toLocaleString())
    setLocation('');
  }


  // handle error status
  if (error) {
    return (
      <section className='error-wrapper'>
        <h2 className='error-msg'>{error.message}</h2>
        <Button variant="contained" onClick={() => navigate('/')}>Home</Button>
      </section>
    )
  }


  // handle loading status
  if (status === 'pending') {
    return (
      <section className='spinner'>
        <CircularProgress />
      </section>
    )
  };

  if (status === 'success') {
    return (
      <Alert severity='success'>Ad sent successfully.</Alert>
    )
  }

  return (
    <div className={styles.formWrapper}>
      <h2>Sign Up</h2>
      <form className={styles.form} onSubmit={handleSubmit}>


        <TextField id="title" label="Title" variant="outlined" sx={{ margin: '5px 0' }} value={title} onChange={e => setTitle(e.target.value)} required InputProps={{
          inputProps: {
            min: 10,
            max: 50,
          },
        }} />

        <TextField id="desc" label="Description" variant="outlined" sx={{ margin: '5px 0' }} value={desc} onChange={e => setDesc(e.target.value)} multiline
          rows={4} required InputProps={{
            inputProps: {
              min: 20,
              max: 1000,
            },
          }} />

        <TextField id="price" label="Price" variant="outlined" sx={{ margin: '5px 0' }} value={price} onChange={e => setPrice(e.target.value)} type='number' required />

        <TextField id="location" label="Location" variant="outlined" sx={{ margin: '5px 0' }} value={location} onChange={e => setLocation(e.target.value)} required />

        <TextField id="photo" variant="outlined" type="file" helperText="Select Your Avatar" sx={{ margin: '5px 0' }} onChange={e => setPhoto(e.target.files[0])} />

        <Button type='submit' variant='contained' sx={{ maxWidth: '100px', marginTop: '30px' }}>Submit</Button>
      </form>
    </div>
  )
}


export default AdForm;