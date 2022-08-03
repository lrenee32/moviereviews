import { FunctionComponent } from 'react';
import { Hero, Content } from '../components';
import { getReviews } from '../services/api/reviews/reviews';
import { Entries, Review } from '../utils/types';
import { GetStaticProps } from 'next/types';

interface Props {
  reviews: Entries<Review>,
};

export const Index: FunctionComponent<Props> = (props: Props) => {
  const { reviews } = props;

  return (
    <>
      <Hero reviews={reviews} />
      <Content reviews={reviews} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const reviews: Entries<Review> = await getReviews('');

  return { props: { reviews } };
};

export default Index;
