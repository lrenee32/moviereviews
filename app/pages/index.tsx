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
        <meta name="description" content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://splatterandscream.com" />

        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Splatter & Scream" />
        <meta property="og:url" content="https://splatterandscream.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Splatter & Scream" />
        <meta
          property="og:description"
          content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans."
        />
        <meta property="og:image" content="https://splatterandscream.com/images/site-logo-main.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://splatterandscream.com" />
        <meta name="twitter:title" content="Splatter & Scream" />
        <meta name="twitter:description" content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans." />
        <meta name="twitter:image" content="https://splatterandscream.com/images/site-logo-main.png" />
        <meta name="twitter:site" content="@splatternscream" />
      </Head>
      <Nav style="hero" />
      {entries && entries.Featured && entries.Featured.length > 0 && (
        <Hero entries={entries.Featured} />
      )}
      <Nav style="main" />
      <Content entries={entries} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const All: Entries<Review> = await getEntries();
  const Featured: Entries<Review> = await getEntries(null, null, null, [{ key: 'Featured', value: 'true' }]);
  const SitePicks: Entries<Review> = await getEntries(null, null, null, [{ key: 'SitePick', value: 'true' }]);
  const TopRated: Entries<Review> = await getEntries(null, 'review', 'UserRating', null, 4);
  const LatestReviews: Entries<Review> = await getEntries(null, 'review', null, null, 4);

  return { props: { entries: { All, Featured, SitePicks, TopRated, LatestReviews } }, revalidate: 10 };
};

export default Index;
