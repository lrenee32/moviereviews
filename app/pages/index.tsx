import { FunctionComponent } from 'react';
import { Hero, Content, Nav } from 'components';
import { getReviews } from 'services/api/reviews/reviews';
import { Entries, Review } from 'utils/types';
import { GetStaticProps } from 'next/types';
import styles from 'components/shared/nav/main-nav.module.scss';

interface Props {
  reviews: Entries<Review>,
};

export const Index: FunctionComponent<Props> = (props: Props) => {
  const { reviews } = props;

  return (
    <>
      <Nav styles={styles} />
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
