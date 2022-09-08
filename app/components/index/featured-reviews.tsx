import { FunctionComponent, useState } from 'react';
import Image from 'next/future/image';
import { Entries, Entry, Review } from 'utils/types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import NoSsr from '@mui/material/NoSsr';
import { SectionDivider } from 'components/shared/section-divider';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { getPosterImage } from 'services/api/entries/entries';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material';

type ActionTypes = 'pick' | 'top';

interface Props {
  sitePicks: Entries<Review>["SitePicks"],
  topRated: Entries<Review>["TopRated"],
};

export const FeaturedReviews: FunctionComponent<Props> = (props: Props) => {
  const { sitePicks, topRated } = props;
  const sitePicksArr: Entries<Review>["SitePicks"] = [];
  sitePicks.map(i => {
    sitePicksArr[Number(i.SitePick)] = i;
  });
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const [filterType, setFilterType] = useState<ActionTypes>('pick');
  const [filtered, setFiltered] = useState<Entry<Review>[]>(sitePicksArr);

  const filterAction = (action: ActionTypes) => {
    setFilterType(action);
    switch (action) {
      case 'pick':
        setFiltered(sitePicksArr);
        break;
      case 'top':
        setFiltered(topRated);
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
            <Grid key={entry.PK} item xs={6} md={3}>
              <Card id={`${entry.PK}-featured`} sx={{ backgroundImage: 'none', backgroundColor: 'transparent', boxShadow: 'none' }}>
                <CardActionArea href={`/entry/${entry.PK}`}>
                  <Image src={getPosterImage(entry.Details!.FilmPoster)} alt={`${entry.Title}-${entry.PK}-poster`} fill />
                </CardActionArea>
                <CardContent sx={{ paddingX: '0' }}>
                  <Typography lineHeight="1" mb="2.5px" variant="h6">{entry.Details!.FilmTitle}</Typography>
                  <NoSsr>
                    <Typography fontSize="12px" color="primary" sx={{ textTransform: 'uppercase', mb: '5px' }}>| { formatDistanceToNowStrict(entry.Created) } ago</Typography>
                  </NoSsr>
                  <Box>
                    <Chip
                      label={ `IMDB: ${entry.Details!.TMDBRating}` }
                      color="primary"
                      sx={{ marginRight: '5px', mb: '5px' }}
                      />
                    <Chip
                      label={ `Personal: ${entry.UserRating}` }
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
