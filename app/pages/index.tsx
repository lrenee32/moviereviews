import { FunctionComponent } from 'react';
import { Hero, Content, Nav } from 'components';
import { getEntries } from 'services/api/entries/entries';
import { Entries, Review } from 'utils/types';
import { GetStaticProps } from 'next/types';
import { ScrollToTop } from 'components/shared/scoll-to-top';

interface Props {
  entries: Entries<Review>,
};

export const Index: FunctionComponent<Props> = (props: Props) => {
  const { entries } = props;

  return (
    <>
      <Nav style="main" />
      <Hero entries={entries} />
      <Nav style="secondary" />
      <Content entries={entries} />
      <ScrollToTop />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const entries: Entries<Review> = await getEntries('');

  return { props: { entries } };
};

export default Index;
