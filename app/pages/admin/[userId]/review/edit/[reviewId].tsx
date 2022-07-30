import { FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ReviewForm } from '../../../../../components/admin/form';
import { getReview, getReviews } from '../../../../../services/api/admin/admin';
import { updateReview } from '../../../../../services/api/admin/admin';
import { Reviews, Review } from '../../../../../utils/types';
import { GetStaticProps, GetStaticPaths } from 'next/types';

interface Props {
  review: Review,
};

const CreateReview: FunctionComponent<Props> = (props: Props) => {
  const router = useRouter();
  const { Title, Review, ReviewId, UserId } = props.review;
  const initialValues: { title: Review["Title"], input: Review["Review"] } = {
    title: Title,
    input: Review,
  };
  const [title, setTitle] = useState<Review["Title"]>(initialValues.title);
  const [input, setInput] = useState<Review["Review"]>(initialValues.input);
  const update: () => void = async () => {
    const body = {
      Title: title,
      Review: input,
      Year: props.review.Year,
      TMDBId: props.review.TMDBId,
      Rating: props.review.Rating,
      Created: props.review.Created,
    };
    return updateReview(UserId, ReviewId, body)
      .then(() => router.push(`/admin/${UserId}`));
  };
  
  return (
    <Container sx={{ marginY: '100px' }}>
      <Typography variant="h3" marginBottom="30px">Edit Review</Typography>
      <ReviewForm actions={{ titleAction: setTitle, inputAction: setInput, formAction: update }} values={{ title, input }} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const userId = context.params?.userId;
  const reviewId = context.params?.reviewId;
  const review: Review = await getReview(userId, reviewId);

  return { props: { review } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const reviews: Reviews = await getReviews('a5c723d5-89ba-4554-a09d-ee3870be41a3', '');

  const paths = reviews.map((review) => ({
    params: { userId: 'a5c723d5-89ba-4554-a09d-ee3870be41a3', reviewId: review.ReviewId },
  }));

  return { paths, fallback: 'blocking' };
};
export default CreateReview;
