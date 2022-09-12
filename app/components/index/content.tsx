import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Entries, Review } from 'utils/types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { FeaturedReviews } from './featured-reviews';
import { LatestHeadlines } from './latest-headlines';
import { Footer } from 'components/shared/nav/footer';
import { VARIABLES } from 'assets/themes/themes';

interface Props {
  entries: Entries<Review>,
  loadMore: Dispatch<SetStateAction<boolean>>,
  loading: boolean,
};

export const Content: FunctionComponent<Props> = (props: Props) => {
  const { loadMore, loading } = props;
  const { SitePicks, TopRated } = props.entries;

  return (
    <Box sx={{ background: `linear-gradient(to bottom, #0D090A 85%, ${VARIABLES.primaryColor} 185%)`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Container maxWidth="lg" sx={{ pt: '70px', background: VARIABLES.bgColor, boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.50);' }}>
        <FeaturedReviews sitePicks={SitePicks.data} topRated={TopRated.data} />
        <LatestHeadlines entries={props.entries} loadMore={loadMore} loading={loading} />
        <Footer />
      </Container>
    </Box>
  );
};
