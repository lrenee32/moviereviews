import { FunctionComponent, useState } from 'react';
import { Entries, Entry, Review } from 'utils/types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { SectionDivider } from 'components/shared/section-divider';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { getPosterImage } from 'services/api/entries/entries';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material';

type ActionTypes = 'pick' | 'top';

interface Props {
  entries: Entries<Review>["All"],
};

export const FeaturedReviews: FunctionComponent<Props> = (props: Props) => {
  const { entries } = props;
  const clonedArr = entries && entries.length > 0 ? [...entries] : [];
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const [filterType, setFilterType] = useState<ActionTypes>('pick');
  const [filtered, setFiltered] = useState<Entry<Review>[]>(clonedArr.filter(i => i.SitePick));

  const filterAction = (action: ActionTypes) => {
    const arr = [...entries].filter(i => i.Type === 'review');
    setFilterType(action);
    switch (action) {
      case 'pick':
        setFiltered(arr.filter(i => i.SitePick));
        break;
      case 'top':
        setFiltered(arr.sort((a, b) => (b.Details!.UserRating - a.Details!.UserRating)).splice(0, 4));
        break;
    }
  };

  return (
    <>
      <SectionDivider text="Featured Reviews" />
      <Box textAlign={isLg ? 'right' : 'center'} mb="20px">
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
      <Grid container spacing={2} mb="70px">
        {filtered.map((entry: Entry<Review>) => {
          return (
            <Grid key={entry.EntryId} item xs={6} md={3}>
              <Card id={`${entry.EntryId}-featured`} sx={{ backgroundImage: 'none', backgroundColor: 'transparent', boxShadow: 'none' }}>
                <CardActionArea href={`/entry/${entry.EntryId}`}>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={getPosterImage(entry.Details!.FilmPoster)}
                    alt={`${entry.Title}-${entry.EntryId}`}
                  />
                </CardActionArea>
                <CardContent sx={{ paddingX: '0' }}>
                  <Typography lineHeight="1" mb="2.5px" variant="h6">{entry.Details!.FilmTitle}</Typography>
                  <Typography fontSize="12px" color="primary" sx={{ textTransform: 'uppercase', mb: '5px' }}>| { formatDistanceToNowStrict(entry.Created) } ago</Typography>
                  <Box>
                    <Chip
                      label={ `IMDB: ${entry.Details!.TMDBRating}` }
                      color="primary"
                      sx={{ marginRight: '5px', mb: '5px' }}
                      />
                    <Chip
                      label={ `Personal: ${entry.Details!.UserRating}` }
                      color="primary"
                      sx={{ marginRight: '5px', mb: '5px' }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
