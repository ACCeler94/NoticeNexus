import { useEffect } from 'react';
import { fetchAllAds, fetchBySearchParams } from './adsSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Ads.module.scss';
import AdCard from '../AdCard/AdCard';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


const Ads = () => {
  const ads = useSelector(state => state.ads.ads);
  const status = useSelector(state => state.ads.status);
  const error = useSelector(state => state.ads.error);
  const filteredAds = useSelector(state => state.ads.filteredAds);
  const searchPhrase = useSelector(state => state.ads.searchPhrase)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAds())
  }, [dispatch])

  useEffect(() => {
    if (searchPhrase) {
      dispatch(fetchBySearchParams(searchPhrase));
    }
  }, [searchPhrase, dispatch])


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

  // display filtered ads
  if (filteredAds && searchPhrase) {
    return (
      <section className={styles.adsSection}>
        <ul className={styles.adsList}>
          {filteredAds.map(ad => (
            <li key={ad._id}>
              <AdCard {...ad} />
            </li>
          ))}
        </ul>
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