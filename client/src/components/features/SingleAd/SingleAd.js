import { useDispatch, useSelector } from 'react-redux';
import styles from './SingleAd.module.scss';
import { useEffect, useState } from 'react';
import { fetchById } from '../Ads/adsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { IMAGES_URL } from '../../../API/config';
import Button from '@mui/material/Button';


const SingleAd = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(state => state.ads.status);
  const error = useSelector(state => state.ads.error);
  const user = useSelector(state => state.users.user);

  const currentAd = useSelector(state => state.ads.currentAd)
  let { id } = useParams();



  useEffect(() => {
    dispatch(fetchById(id));
  }, [dispatch, id])



  // handle error status
  if (error) {
    return (
      <section className='error-wrapper'>
        <h2 className='error-msg'>{error}</h2>
        <Button variant="contained" onClick={() => navigate(-1)}>Go back</Button>
      </section>
    )
  }

  // check for currentAd and seller before rendering
  if (currentAd && currentAd.seller) {
    return (
      <section className={styles.singleAd}>

        {user && user.login === currentAd.seller.login &&
          < div className={styles.adButtonsWrapper}>
            <Button variant="contained" onClick={() => navigate('edit')} >Edit</Button>
            <Button variant="contained" onClick={() => navigate('delete')} sx={{
              backgroundColor: 'red',
              borderColor: 'red',
              '&:hover': {
                backgroundColor: 'rgb(200, 0, 0)',
              },
              margin: '0 5px'
            }} >Delete</Button>
          </div>}


        <div className={styles.singleAdWrapper}>
          <div className={styles.adHeader}>
            <h2>{currentAd.title}</h2>
            <span style={{ fontSize: '1rem' }}>Location: {currentAd.location}</span>
          </div>
          <div className={styles.imageWrapper}>
            <img src={`${IMAGES_URL}/${currentAd.photo}`} alt='current ad' />
          </div>
          <div className={styles.adContent}>
            <p>{currentAd.desc}</p>
            <p>Price: ${currentAd.price}</p>
          </div>
          <div className={styles.sellerWrapper}>
            <img src={`${IMAGES_URL}/${currentAd.seller.avatar}`} alt='seller avatar' />
            <span className={styles.sellerName}>{currentAd.seller.login}</span>
            <span>Tel: {currentAd.seller.phoneNumber}</span>
          </div>
        </div>
      </section >
    )
  }


  // handle loading status
  if (status === 'pending' || !currentAd._id || !currentAd.seller) {
    return (
      <section className='spinner'>
        <CircularProgress />
      </section>
    )
  };
}

export default SingleAd;