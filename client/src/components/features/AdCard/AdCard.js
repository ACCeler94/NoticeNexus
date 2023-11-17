import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IMAGES_URL } from '../../../API/config';
import { useNavigate } from 'react-router-dom';



export default function AdCard(adData) {

  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 500, backgroundColor: "#1976D2", margin: '0 auto' }}>
      <CardActionArea onClick={() => navigate(`ads/${adData._id}`)}>
        <CardContent sx={{ height: '70px' }}>
          <Typography gutterBottom variant="h5" component="div" color='#fff' sx={{ wordWrap: 'break-word', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            {adData.title}
            <br />
            <span style={{ fontSize: '0.9rem' }}>Location: {adData.location}</span>
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="300"
          image={`${IMAGES_URL}/${adData.photo}`}
          alt='Ad miniature'
        />
      </CardActionArea>
    </Card >
  );
}