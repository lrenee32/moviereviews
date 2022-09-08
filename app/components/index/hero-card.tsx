import { FunctionComponent } from 'react';
import Image from 'next/future/image';
import { Entry, Review } from 'utils/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NoSsr from '@mui/material/NoSsr';
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
      id={`${entry.PK}-hero`}
      variant="outlined"
      sx={{
        position: 'relative',
        height: '100%',
        borderColor: '#0e0e0e',
        '&:hover > img': {
          transform: 'scale(1.1)',
          opacity: '.5',
        }
      }}
    >
      <Image
        src={entry.Details!.FeaturedImage as unknown as string}
        alt={`${entry.Title}-${entry.PK}-featured`}
        fill
        style={{ transition: '.3s ease-in-out', objectFit: 'cover' }}
        priority
        quality="100"
      />
      <CardContent
        sx={{
          position: 'absolute',
          bottom: '0',
          zIndex: '99',
          maxWidth: '600px',
        }}
      >
        <NoSsr>
          <Typography fontSize="12px" color="primary" sx={{ textTransform: 'uppercase' }}>| { formatDistanceToNowStrict(entry.Created) } ago</Typography>
        </NoSsr>
        <Typography variant={headingVariant} marginBottom="10px">{ entry.Title }</Typography>
        <Typography marginBottom="15px">{ showDescription && entry.Details!.FilmOverview }</Typography>
        <Button href={`/entry/${entry.PK}`} variant="outlined">Read More</Button>
      </CardContent>
    </Card>
  );
};