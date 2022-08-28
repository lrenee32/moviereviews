import { FunctionComponent } from 'react';
import { Hero, Content, Nav } from 'components';
import { getEntries } from 'services/api/entries/entries';
import { Entries, Review } from 'utils/types';
import Head from 'next/head';
import { GetStaticProps } from 'next/types';

interface Props {
  entries: Entries<Review>,
};

export const Index: FunctionComponent<Props> = (props: Props) => {
  const { entries } = props;

  return (
    <>
      <Head>
        <title>Splatter & Scream - Horror Media by Horror Fans</title>
        <meta property="og:url" content="https://splatterandscream.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Splatter & Scream" />
        <meta
          property="og:description"
          content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans."
        />
        <meta property="og:image" content="https://splatterandscream.com/images/site-logo-main.png" />
      </Head>
      <Nav style="hero" />
      {entries && entries.All && entries.All.length > 0 && (
        <Hero entries={entries} />
      )}
      <Nav style="main" />
      <Content entries={entries} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const entries: Entries<Review> = await getEntries('');

  return { props: { entries }, revalidate: 10 };
};

export default Index;
