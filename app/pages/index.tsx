import { FunctionComponent } from 'react';
import { Hero, Content } from '../components';
import { getReviews } from '../services/api/reviews/reviews';
import { Reviews } from '../utils/types';
import { GetStaticProps } from 'next/types';

interface Props {
  reviews: Reviews,
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
  const reviews: Reviews = await getReviews('');

  return { props: { reviews } };
};

export default Index;
