import { useEffect } from 'react';
import { fetchAllAds } from './adsSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Ads.module.scss';
import AdCard from '../AdCard/AdCard';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


const Ads = () => {
  const ads = useSelector(state => state.ads.ads);
  const status = useSelector(state => state.ads.status);
  const error = useSelector(state => state.ads.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAds())
  }, [dispatch])

  // handle loading status
  if (status === 'pending' && !ads) {
    return (
      <section className='spinner'>
        <CircularProgress />
      </section>
    )
  };

  // handle error status
  if (error) {
    return (
      <section className='error-wrapper'>
        <h2 className='error-msg'>Error while loading ads!</h2>
        <Button variant="contained" onClick={() => dispatch(fetchAllAds())}>Try Again</Button>
      </section>
    )
  }


  return (
    <section className={styles.adsSection}>
      <ul className={styles.adsList}>
        {ads.map(ad => (
          <li key={ad._id}>
            <AdCard {...ad} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Ads;