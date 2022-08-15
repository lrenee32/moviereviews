import { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Nav } from 'components';
import { getEntries } from 'services/api/entries/entries';
import { Entries, Review } from 'utils/types';
import { GetStaticProps } from 'next/types';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { VARIABLES } from 'assets/themes/themes';
import { Footer } from 'components/shared/nav/footer';

interface Props {
  entries: Entries<Review>["All"],
};

export const Index: FunctionComponent<Props> = (props: Props) => {
  const { entries } = props;

  return (
    <Box sx={{ background: `linear-gradient(to bottom, #0D090A 85%, ${VARIABLES.primaryColor} 185%)`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Container maxWidth="lg" sx={{ background: VARIABLES.bgColor, boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.50);' }}>
        <Nav style="large" />
        <Card key={`${entries[0].Title}-${entries[0].EntryId}-headline`} sx={{ mb: '40px' }}>
          <CardActionArea href={`/entry/${entries[0].EntryId}`} sx={{ position: 'relative', '.MuiCardActionArea-focusHighlight': { backgroundColor: '#000000' } }}>
            <CardMedia
              component="img"
              image={entries[0].Details!.FeaturedImage}
              alt={`${entries[0].Title}-${entries[0].EntryId}-headline`}
              sx={{ width: '100%', maxHeight: '500px' }}
            />
            <Box sx={{ background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,.9) 50%, rgba(0,0,0,0) 100%)', position: 'absolute', zIndex: '999', top: '0', left: '0', height: '100%', width: '100%' }} />
            <CardContent sx={{ width: '45%', m: "50px", position: 'absolute', zIndex: '1000', top: '0', left: '0' }}>
            <Typography
              sx={{
                backgroundColor: VARIABLES.primaryColor,
                padding: '2.5px 10px',
                transform: 'skewX(-15deg)',
                display: 'inline-block',
                mb: '10px',
              }}
            >
              Reviews
            </Typography>
              <Typography variant="h2">
                {entries[0].Title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Box width="70%">
          {entries.slice(1, entries.length).map(entry => (
            <Card key={`${entry.Title}-${entry.EntryId}-review`} sx={{ mt: '20px', mr: '20px'}}>
              <CardActionArea href={`/entry/${entry.EntryId}`} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <CardMedia
                  component="img"
                  image={entry.Details!.FeaturedImage}
                  alt={`${entry.Title}-${entry.EntryId}-review`}
                  sx={{ width: '50%' }}
                />
                <CardContent sx={{ width: '50%', mt: "30px" }}>
                  <Typography fontSize="12px" color="primary" sx={{ textTransform: 'uppercase', mb: '5px' }}>{entry.Type} | { formatDistanceToNowStrict(entry.Created) } ago</Typography>
                  <Typography variant="h5">
                    {entry.Title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        <Footer />
      </Container>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const entries: Entries<Review> = await getEntries('');
  const filtered = entries.All.filter(i => i.Type === 'review');

  return { props: { entries: filtered } };
};

export default Index;
