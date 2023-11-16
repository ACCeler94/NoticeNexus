import { useDispatch, useSelector } from 'react-redux';
import { deleteById } from '../../features/Ads/adsSlice';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';


const Delete = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.ads.status);
  const error = useSelector(state => state.ads.error);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(deleteById(id))
  }, [dispatch, id]);


  // handle error status
  if (error) {
    return (
      <section className='error-wrapper'>
        <Alert severity="error">Failed to delete the ad!</Alert>
        <Button variant="contained" onClick={() => navigate(-1)}>Go back</Button>
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
      <Alert severity='success'>Ad successfully deleted.</Alert>
    )
  }

  return null;
};

export default Delete;