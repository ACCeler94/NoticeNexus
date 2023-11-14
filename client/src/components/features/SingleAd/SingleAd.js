import { useDispatch, useSelector } from 'react-redux';
import styles from './SingleAd.module.scss';
import { useEffect, useState } from 'react';
import { fetchById } from '../Ads/adsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { IMAGES_URL } from '../../../API/config';


const SingleAd = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(state => state.ads.status);
  const error = useSelector(state => state.ads.error);

  const [currentAd, setCurrentAd] = useState({});
  let { id } = useParams();



  useEffect(() => {
    dispatch(fetchById(id))
      .then(adData => {
        console.log(adData)
        setCurrentAd(adData.payload);
      })
  }, [dispatch, id])



  // handle error status
  if (error) {
    return (
      <section className='error-wrapper'>
        <h2 className='error-msg'>{error}</h2>
        <button onClick={() => navigate(-1)}>Go back</button>
      </section>
    )
  }

  // check for currentAd and seller before rendering
  if (currentAd && currentAd.seller) {
    return (
      <section className={styles.singleAd}>
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
      <section className={styles.singleAd}>
        <FadeLoader
          color="#1976d2"
          height={15}
        />
      </section>
    )
  };
}

export default SingleAd;