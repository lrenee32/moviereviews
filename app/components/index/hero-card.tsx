import { FunctionComponent } from 'react';
import { Entry, Review } from 'utils/types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TypographyVariant } from '@mui/material';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

interface Props {
  entry: Entry<Review>,
  headingVariant: TypographyVariant,
  showDescription?: boolean | false;
};

export const HeroCard: FunctionComponent<Props> = (props: Props) => {
  const { entry, headingVariant, showDescription } = props;

  return (
    <Card
      variant="outlined"
      sx={{
        position: 'relative',
        height: '100%',
        borderColor: '#0e0e0e',
        '&:hover .MuiCardMedia-img': {
          transform: 'scale(1.1)',
          opacity: '.5',
        }
      }}
    >
      <CardMedia
        component="img"
        height="100%"
        image={entry.Details!.FeaturedImage}
        alt={`${entry.Title}-${entry.EntryId}`}
        sx={{
          position: 'absolute',
          height: '100%',
          transition: '.3s ease-in-out',
        }}
      />
      <CardContent
        sx={{
          position: 'absolute',
          bottom: '0',
          zIndex: '99',
          maxWidth: '600px',
        }}
      >
        <Box display="flex" marginBottom="10px" alignItems="center">
          {entry.Type === 'review' &&
            <>
              <Chip label={`IMDB: ${entry.Details!.TMDBRating}`} color="primary" sx={{ marginRight: '5px' }} />
              <Chip label={`Personal: ${entry.Details!.UserRating}`} color="primary" sx={{ marginRight: '5px' }} />
            </>
          }
          <Typography fontSize="12px" color="primary" sx={{ textTransform: 'uppercase' }}>| { formatDistanceToNowStrict(entry.Created) } ago</Typography>
        </Box>
        <Typography variant={headingVariant} marginBottom="10px">{ entry.Title }</Typography>
        <Typography marginBottom="15px">{ showDescription && entry.Details!.FilmOverview }</Typography>
        <Button href={`/entry/${entry.EntryId}`} variant="outlined">Read More</Button>
      </CardContent>
    </Card>
  );
};