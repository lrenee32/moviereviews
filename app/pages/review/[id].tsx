import { FunctionComponent } from 'react';
import { getReviews, getReview } from '../../services/api/reviews/reviews';
import { Reviews, Review } from '../../utils/types';
import { GetStaticProps, GetStaticPaths } from 'next/types';

interface Props {
  review: Review,
};

const ReviewDetails: FunctionComponent<Props> = (props: Props) => {
  const { review } = props;

  return (
    <div>{ review.Title }</div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const review: Review = await getReview(id);

  return { props: { review } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const reviews: Reviews = await getReviews('');

  const paths = reviews.all.map((review) => ({
    params: { id: review.ReviewId },
  }));

  return { paths, fallback: 'blocking' };
};

export default ReviewDetails;
