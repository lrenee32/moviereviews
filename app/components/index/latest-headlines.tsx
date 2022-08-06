import { FunctionComponent } from 'react';
import { Entries, Review } from 'utils/types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { LatestReviews } from './latest-reviews';
import { SectionDivider } from 'components/shared/section-divider';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

interface Props {
  entries: Entries<Review>["All"],
};

export const LatestHeadlines: FunctionComponent<Props> = (props: Props) => {
  const { entries } = props;

  return (
    <>
      <SectionDivider text="Latest Headlines" />
      <Box display="flex">
        <Box width="70%">
          {entries.map(entry => (
            <Card key={`${entry.Title}-${entry.EntryId}-headline`} sx={{ mt: '20px', mr: '20px'}}>
              <CardActionArea href={`/entry/${entry.EntryId}`} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <CardMedia
                  component="img"
                  image={entry.Details!.FeaturedImage}
                  alt={`${entry.Title}-${entry.EntryId}-headline`}
                  sx={{ width: '50%' }}
                />
                <CardContent sx={{ width: '50%', mt: "30px" }}>
                  <Typography fontSize="12px" color="primary" sx={{ textTransform: 'uppercase', mb: '5px' }}>{entry.Type} | { formatDistanceToNowStrict(entry.Created) } ago</Typography>
                  <Typography variant="h4">
                    {entry.Title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        <Box width="30%" position="sticky" alignSelf="flex-start" top="0">
          <LatestReviews entries={entries} />
        </Box>
      </Box>
    </>
  );
};
