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
import { VARIABLES } from 'assets/themes/themes';

type ActionTypes = 'recent' | 'pick' | 'top';

interface Props {
  entries: Entries<Review>,
};

export const Content: FunctionComponent<Props> = (props: Props) => {
  const { All } = props.entries;
  const clonedArr = [...All];
  const [filterType, setFilterType] = useState<ActionTypes>('recent');
  const [filtered, setFiltered] = useState<Entry<Review>[]>(clonedArr.filter(i => i.Type === 'review').splice(0, 4));

  const filterAction = (action: ActionTypes) => {
    const arr = [...All].filter(i => i.Type === 'review');
    setFilterType(action);
    switch (action) {
      case 'recent':
        setFiltered(arr.splice(0, 4));
        break;
      case 'pick':
        setFiltered(arr.filter(i => i.SitePick));
        break;
      case 'top':
        setFiltered(arr.sort((a, b) => (b.Details!.UserRating - a.Details!.UserRating)).splice(0, 4));
        break;
      case 'pick':
        setFiltered(arr)
    }
  };

  const getPosterImage = (posterPath: string) => {
    return `https://image.tmdb.org/t/p/w500/${posterPath}`;
  };

  return (
    <Box sx={{ background: `linear-gradient(to right, ${VARIABLES.primaryColor} 0%, ${VARIABLES.bgColor} 20%, ${VARIABLES.bgColor} 80%, ${VARIABLES.primaryColor} 100%)` }}>
      <Container fixed sx={{ paddingY: '100px', backgroundColor: VARIABLES.bgColor }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb="70px">
          <Box>
            <Typography variant="h3" marginBottom="15px">Highlights Today</Typography>
            <Typography variant="h4" sx={{ opacity: '.5' }}>Be sure not to miss these reviews.</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Chip
              label="Recent"
              sx={{ ml: '5px' }}
              onClick={() => filterAction('recent')}
              variant={filterType === 'recent' ? 'filled': 'outlined'}
              size="large"
            />
            <Chip
              label="Site Picks"
              sx={{ ml: '5px' }}
              onClick={() => filterAction('pick')}
              variant={filterType === 'pick' ? 'filled': 'outlined'}
              size="large"
            />
            <Chip
              label="Top Rated"
              sx={{ ml: '5px' }}
              onClick={() => filterAction('top')}
              variant={filterType === 'top' ? 'filled': 'outlined'}
              size="large"
            />
          </Box>
        </Box>
        <Grid container spacing={2}>
          {filtered.map((entry: Entry<Review>) => {
            return (
              <Grid key={entry.EntryId} item xs={6} md={3}>
                <Card sx={{ backgroundImage: 'none', backgroundColor: 'transparent', boxShadow: 'none' }}>
                  <CardActionArea href={`/entry/${entry.EntryId}`}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={getPosterImage(entry.Details!.FilmPoster)}
                      alt={`${entry.Title}-${entry.EntryId}`}
                    />
                  </CardActionArea>
                  <CardContent sx={{ paddingX: '0' }}>
                    <Typography lineHeight="1" mb="2.5px" variant="h6">{entry.Title}</Typography>
                    <Typography fontSize="12px" color="primary" sx={{ textTransform: 'uppercase', mb: '5px' }}>| { formatDistanceToNowStrict(entry.Created) } ago</Typography>
                    <Box>
                      <Chip
                        label={ `IMDB: ${entry.Details!.TMDBRating}` }
                        color="primary"
                        sx={{ marginRight: '5px' }}
                      />
                      <Chip
                        label={ `Personal: ${entry.Details!.UserRating}` }
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
