import { IMAGES_URL } from '../../../API/config';
import styles from './AdCard.module.scss'


const AdCard = adData => {

  console.log(adData)
  return (
    < div className={styles.adCard} >
      <h3 className={styles.adTitle}>{adData.title}</h3>
      <div className={styles.imageContainer}>
        <img src={`${IMAGES_URL}/${adData.photo}`} alt='Ad miniature' />
      </div>
    </div >
  )
}

export default AdCard;