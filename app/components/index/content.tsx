import { FunctionComponent } from 'react';
import { Entries, Review } from 'utils/types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { FeaturedReviews } from './featured-reviews';
import { LatestHeadlines } from './latest-headlines';
import { VARIABLES } from 'assets/themes/themes';

interface Props {
  entries: Entries<Review>,
};

export const Content: FunctionComponent<Props> = (props: Props) => {
  const { All } = props.entries;

  return (
    <Box sx={{ background: `linear-gradient(to bottom, #0D090A 50%, ${VARIABLES.primaryColor} 150%)` }}>
      <Container fixed sx={{ pb: '100px', pt: '70px', background: VARIABLES.bgColor, boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.50);' }}>
        <FeaturedReviews entries={All} />
        <LatestHeadlines entries={All} />
      </Container>
    </Box>
  );
};
