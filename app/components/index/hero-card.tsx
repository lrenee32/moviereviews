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

interface Props {
  review: Entry<Review>,
  headingVariant: TypographyVariant,
  showDescription?: boolean | false;
};

export const HeroCard: FunctionComponent<Props> = (props: Props) => {
  const { review, headingVariant, showDescription } = props;

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
        image={review.Details!.FeaturedImage}
        alt={`${review.Title}-${review.EntryId}`}
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
        <Box marginBottom="10px">
          <Chip label={`IMDB: ${review.Details!.TMDBRating}`} color="primary" sx={{ marginRight: '5px' }} />
          <Chip label={`Personal: ${review.Details!.UserRating}`} color="primary" />
        </Box>
        <Typography variant={headingVariant} marginBottom="10px">{ review.Title }</Typography>
        <Typography marginBottom="15px">{ showDescription && review.Details!.FilmOverview }</Typography>
        <Button href={`/review/${review.EntryId}`} variant="outlined">Read Review</Button>
      </CardContent>
    </Card>
  );
};