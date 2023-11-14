import { useEffect } from 'react';
import { fetchAllAds } from './adsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FadeLoader } from 'react-spinners'
import styles from './Ads.module.scss';
import AdCard from '../AdCard/AdCard';


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
      <section className={styles.adsSection}>
        <FadeLoader
          color="#1976d2"
          height={15}
        />
      </section>
    )
  };

  // handle error status
  if (error) {
    return (
      <section className='error-wrapper'>
        <h2 className='error-msg'>Error while loading ads!</h2>
        <button onClick={() => dispatch(fetchAllAds())}>Try Again</button>
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