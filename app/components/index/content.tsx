import { FunctionComponent } from 'react';
import { Entries, Entry, Review } from 'utils/types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
// import styles from '../../assets/styles/components/index/content.module.scss';

interface Props {
  reviews: Entries<Review>,
};

export const Content: FunctionComponent<Props> = (props: Props) => {
  const { Featured, All } = props.reviews;

  const getPosterImage = (posterPath: string) => {
    return `https://image.tmdb.org/t/p/w500/${posterPath}`;
  };

  return (
    <Container fixed sx={{ paddingY: '100px' }}>
      <Box>
        <Typography variant="h3" marginBottom="15px">Highlights Today</Typography>
        <Typography variant="h4" marginBottom="70px" sx={{ opacity: '.5' }}>Be sure not to miss these reviews.</Typography>
      </Box>
      <Grid container spacing={2}>
        {Featured.map((review: Entry<Review>) => {
          return (
            <Grid key={review.EntryId} item xs={6} md={3}>
              <Card>
                <CardActionArea href={`/review/${review.EntryId}`}>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={getPosterImage(review.Details!.FilmPoster)}
                    alt={`${review.Title}-${review.EntryId}`}
                  />
                </CardActionArea>
                <CardContent sx={{ paddingX: '0' }}>
                  <Typography variant="h6">{review.Title}</Typography>
                  <Box>
                    <Chip
                      label={ `IMDB: ${review.Details!.TMDBRating}` }
                      color="primary"
                      sx={{ marginRight: '5px' }}
                    />
                    <Chip
                      label={ `Personal: ${review.Details!.UserRating}` }
                      color="primary"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
