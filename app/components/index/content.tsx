import { FunctionComponent, useState } from 'react';
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
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

type ActionTypes = 'recent' | 'featured' | 'top';

interface Props {
  reviews: Entries<Review>,
};

export const Content: FunctionComponent<Props> = (props: Props) => {
  const { All } = props.reviews;
  const [filterType, setFilterType] = useState<ActionTypes>('recent');
  const [filtered, setFiltered] = useState<Entry<Review>[]>(All.splice(0, 4));

  const filterAction = (action: ActionTypes) => {
    setFilterType(action);
    switch (action) {
      case 'recent':
        setFiltered(All.splice(0, 4));
        break;
      case 'featured':
        setFiltered(All.filter(i => i.Details!.FeaturedImage !== ''));
        break;
      case 'top':
        setFiltered(All.sort((a, b) => (b.Details!.UserRating - a.Details!.UserRating)).splice(0, 4));
        break;
    }
  };

  const getPosterImage = (posterPath: string) => {
    return `https://image.tmdb.org/t/p/w500/${posterPath}`;
  };

  return (
    <Box sx={{ background: 'linear-gradient(to right, #e91e63 0%, #121212 20%, #121212 80%, #e91e63 100%)' }}>
      <Container fixed sx={{ paddingY: '100px', backgroundColor: '#121212' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb="70px">
          <Box>
            <Typography variant="h3" marginBottom="15px">Highlights Today</Typography>
            <Typography variant="h4" sx={{ opacity: '.5' }}>Be sure not to miss these reviews.</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Chip label="Recent" sx={{ ml: '5px' }} onClick={() => filterAction('recent')} variant={filterType === 'recent' ? 'filled': 'outlined'} />
            <Chip label="Top Rated" sx={{ ml: '5px' }} onClick={() => filterAction('top')} variant={filterType === 'top' ? 'filled': 'outlined'} />
            <Chip label="Featured" sx={{ ml: '5px' }} onClick={() => filterAction('featured')} variant={filterType === 'featured' ? 'filled': 'outlined'} />
          </Box>
        </Box>
        <Grid container spacing={2}>
          {filtered.map((review: Entry<Review>) => {
            return (
              <Grid key={review.EntryId} item xs={6} md={3}>
                <Card sx={{ backgroundImage: 'none' }}>
                  <CardActionArea href={`/review/${review.EntryId}`}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={getPosterImage(review.Details!.FilmPoster)}
                      alt={`${review.Title}-${review.EntryId}`}
                    />
                  </CardActionArea>
                  <CardContent sx={{ paddingX: '0' }}>
                    <Typography lineHeight="1" mb="2.5px" variant="h6">{review.Title}</Typography>
                    <Typography fontSize="12px" color="primary" sx={{ textTransform: 'uppercase', mb: '10px' }}>| { formatDistanceToNowStrict(review.Created) } ago</Typography>
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
    </Box>
  );
};
