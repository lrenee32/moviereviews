import { FunctionComponent } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReadOnly } from 'components/shared/rich-text-editor/readonly';
import { getReviews, getReview } from 'services/api/reviews/reviews';
import { Entries, Entry, Review } from 'utils/types';
import { GetStaticProps, GetStaticPaths } from 'next/types';

interface Props {
  review: Entry<Review>,
};

const ReviewDetails: FunctionComponent<Props> = (props: Props) => {
  const { review } = props;

  return (
    <Container fixed sx={{ paddingY: '100px' }}>
      <Box>
        <Typography variant="h2" marginBottom="15px">{review.Title}</Typography>
      </Box>
      <ReadOnly value={review.Content} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const review: Review = await getReview(id);

  return { props: { review } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const reviews: Entries<Review> = await getReviews('');

  const paths = reviews.All.map((review) => ({
    params: { id: review.EntryId },
  }));

  return { paths, fallback: 'blocking' };
};

export default ReviewDetails;
