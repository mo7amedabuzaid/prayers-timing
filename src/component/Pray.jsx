import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Pray({name,time,img}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={img}
        title="green iguana"
      />
      <CardContent>
        <Typography sx={{
        fontFamily:"IBM Plex Sans",
        fontWeight:""
        }} gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h2" sx={{ color: 'text.secondary' }}>
        {time}
          </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}