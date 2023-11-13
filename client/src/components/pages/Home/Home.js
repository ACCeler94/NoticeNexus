import { useEffect } from 'react';
import { fetchAllAds } from '../../features/Ads/adsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FadeLoader } from 'react-spinners'
import styles from './Home.module.scss';
import AdCard from '../../features/AdCard/AdCard';


const Home = () => {
  const ads = useSelector(state => state.ads.ads);
  const status = useSelector(state => state.ads.status);
  const error = useSelector(state => state.ads.error);
  const dispatch = useDispatch()

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
    <section className={styles.adsSection}>
      <h2 className='error-msg'>Error while loading ads!</h2>
      <button onClick={() => dispatch(fetchAllAds())}>Try Again</button>
    </section>
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

export default Home;