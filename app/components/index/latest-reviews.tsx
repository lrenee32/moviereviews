import { FunctionComponent } from 'react';
import Image from 'next/future/image';
import { Entries, Review } from 'utils/types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import NoSsr from '@mui/material/NoSsr';
import { SectionDivider } from 'components/shared/section-divider';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { getPosterImage } from 'services/api/entries/entries';

interface Props {
  entries: Entries<Review>["LatestReviews"]["data"],
};

export const LatestReviews: FunctionComponent<Props> = (props: Props) => {
  const { entries } = props;

  return (
    <>
      <SectionDivider text="Latest Reviews" />
      {entries.map(entry => {
        return (
          <Card id={`${entry.PK}-latest-reviews`} key={`${entry.Title}-${entry.PK}-headline`} sx={{ mt: '20px', mr: '20px'}}>
            <CardActionArea href={`/entry/${entry.PK}`} sx={{ display: 'flex', justifyContent: 'flex-start', '& > img': { width: '30% !important' } }}>
              <Image
                src={getPosterImage(entry.Details!.FilmPoster)}
                alt={`${entry.Title}-${entry.PK}-latest-reviews`}
                fill
                style={{ transition: '.3s ease-in-out', objectFit: 'cover' }}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <NoSsr>
                  <Typography
                    fontSize="12px"
                    color="primary"
                    sx={{ textTransform: 'uppercase', mb: '5px' }}
                  >
                    {entry.EntryType} | { formatDistanceToNowStrict(entry.Created) } ago
                  </Typography>
                </NoSsr>
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
