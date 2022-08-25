import { FunctionComponent } from 'react';
import { Entries, Review } from 'utils/types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { SectionDivider } from 'components/shared/section-divider';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { getPosterImage } from 'services/api/entries/entries';

interface Props {
  entries: Entries<Review>["All"],
};

export const LatestReviews: FunctionComponent<Props> = (props: Props) => {
  const { entries } = props;
  const clonedArr = entries && entries.length > 0 ? [...entries] : [];

  return (
    <>
      <SectionDivider text="Latest Reviews" />
      {clonedArr.filter(i => i.Type === 'review').splice(0, 4).map(entry => {
        return (
          <Card id={`${entry.EntryId}-latest-reviews`} key={`${entry.Title}-${entry.EntryId}-headline`} sx={{ mt: '20px', mr: '20px'}}>
            <CardActionArea href={`/entry/${entry.EntryId}`} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <CardMedia
                component="img"
                image={getPosterImage(entry.Details!.FilmPoster)}
                alt={`${entry.Title}-${entry.EntryId}-latest-reviews`}
                sx={{ height: '100%', width: '30%'}}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  fontSize="12px"
                  color="primary"
                  sx={{ textTransform: 'uppercase', mb: '5px' }}
                >
                  {entry.Type} | { formatDistanceToNowStrict(entry.Created) } ago
                </Typography>
                <Typography>
                  {entry.Details!.FilmTitle}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </>
  );
};
