import { FunctionComponent } from 'react';
import { FeaturedReview } from 'utils/types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TypographyVariant } from '@mui/material';

interface Props {
  review: FeaturedReview,
  headingVariant: TypographyVariant,
  showDescription?: boolean | false;
};

export const HeroCard: FunctionComponent<Props> = (props: Props) => {
  const { review, headingVariant, showDescription } = props;

  const getPosterImage = (posterPath: string) => {
    return `/images/${posterPath}`;
    // return `https://image.tmdb.org/t/p/w500/${posterPath}`;
  };

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
        image={getPosterImage(review.FeaturedImage)}
        alt={`${review.Title}-${review.ReviewId}`}
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
          <Chip label={`IMDB: ${review.Details.vote_average}`} color="primary" sx={{ marginRight: '5px' }} />
          <Chip label={`Personal: ${review.Rating}`} color="primary" />
        </Box>
        <Typography variant={headingVariant} marginBottom="10px">{ review.Title }</Typography>
        <Typography marginBottom="15px">{ showDescription && review.Details.overview }</Typography>
        <Button href={`/review/${review.ReviewId}`} variant="outlined">Read Review</Button>
      </CardContent>
    </Card>
  );
};