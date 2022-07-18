import { FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ReviewForm } from '../../../../../components/admin/form';
import { Descendant } from 'slate';
import { getReview, getReviews } from '../../../../../services/api/reviews/reviews';
import { updateReview } from '../../../../../services/api/admin/admin';
import { Reviews, Review } from '../../../../../utils/types';
import { GetStaticProps, GetStaticPaths } from 'next/types';

interface Props {
  review: Review,
};

const CreateReview: FunctionComponent<Props> = (props: Props) => {
  const { Title, Review, ReviewId, UserId } = props.review;
  const initialValues: { title: string, input: Descendant[] } = {
    title: Title,
    input: JSON.parse(Review),
  };
  const [title, setTitle] = useState<string>(initialValues.title);
  const [input, setInput] = useState<Descendant[]>(initialValues.input);
  const update: () => void = async () => {
    const body = {
      UserId,
      Title: title,
      Review: input,
      Year: props.review.Year,
      TMDBId: props.review.TMDBId,
      ReviewId,
      Rating: props.review.Rating,
      Created: props.review.Created,
    };
    return updateReview(UserId, ReviewId, body);
  };
  
  return (
    <Container sx={{ marginY: '100px' }}>
      <Typography variant="h3" marginBottom="30px">Edit Review</Typography>
      <ReviewForm actions={{ titleAction: setTitle, inputAction: setInput, formAction: update }} values={{ title, input }} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const reviewId = context.params?.reviewId;
  const review: Review = await getReview(reviewId);
  console.log(review);

  return { props: { review } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const reviews: Reviews = await getReviews('');

  const paths = reviews.all.map((review) => ({
    params: { userId: 'a5c723d5-89ba-4554-a09d-ee3870be41a3', reviewId: review.ReviewId },
  }));

  return { paths, fallback: 'blocking' };
};
export default CreateReview;
