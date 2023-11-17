import TextField from '@mui/material/TextField';
import styles from './AdForm.module.scss';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from "luxon";
import { useNavigate, useParams } from 'react-router-dom';
import { addNewAd, fetchById, updateAd } from '../Ads/adsSlice';


const AdForm = () => {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  const currentDate = DateTime.now().toLocaleString();
  const params = useParams();
  const status = useSelector(state => state.ads.status);
  const error = useSelector(state => state.ads.error);
  const navigate = useNavigate();
  const currentAd = useSelector(state => state.ads.currentAd);

  let id;
  if (params) {
    id = params.id
  }

  // if id exists and is different than currentAd then fetch ad by id
  useEffect(() => {
    if (id) {
      if (!currentAd.id || currentAd.id !== id) {
        dispatch(fetchById(id));
      }
    }
  }, [dispatch, id, currentAd])



  const [title, setTitle] = useState(currentAd.title || '');
  const [desc, setDesc] = useState(currentAd.desc || '');
  const [date] = useState(currentAd.date || currentDate);
  const [photo, setPhoto] = useState(currentAd.photo || null);
  const [price, setPrice] = useState(currentAd.price || '');
  const [seller] = useState(user.id);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAdData = new FormData();
    newAdData.append('title', title);
    newAdData.append('desc', desc);
    newAdData.append('date', date);
    newAdData.append('photo', photo);
    newAdData.append('price', price);
    newAdData.append('seller', seller)

    // check if id exists, if it does then dispatch updateAd if not then adNewAd
    if (id) {
      dispatch(updateAd())
    } else {
      dispatch(addNewAd(newAdData))
    }
  }


  // handle error status
  if (error) {
    return (
      <section className='error-wrapper'>
        <h2 className='error-msg'>{error}</h2>
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

  return (
    <div className={styles.formWrapper}>
      <h2>Sign Up</h2>
      <form className={styles.form} onSubmit={handleSubmit}>


        <TextField id="title" label="Title" variant="outlined" sx={{ margin: '5px 0' }} value={title} onChange={e => setTitle(e.target.value)} required />

        <TextField id="desc" label="Description" variant="outlined" sx={{ margin: '5px 0' }} value={desc} onChange={e => setDesc(e.target.value)} multiline
          rows={4} required />

        <TextField id="price" label="Description" variant="outlined" sx={{ margin: '5px 0' }} value={price} onChange={e => setPrice(e.target.value)} type='number' required />

        <TextField id="photo" variant="outlined" type="file" helperText="Select Your Avatar" sx={{ margin: '5px 0' }} onChange={e => setPhoto(e.target.files[0])} required />

        <Button type='submit' variant='contained' sx={{ maxWidth: '100px', marginTop: '30px' }}>Submit</Button>
      </form>
    </div>
  )
}


export default AdForm;