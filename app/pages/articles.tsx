import { FunctionComponent } from 'react';
import Head from 'next/head';
import { getEntries } from 'services/api/entries/entries';
import { Entries, Review } from 'utils/types';
import { GetStaticProps } from 'next/types';
import { ContentSection } from 'components/shared/content/content-section';

interface Props {
  entries: Entries<Review>["All"],
};

export const Articles: FunctionComponent<Props> = (props: Props) => {
  const { entries } = props;

  return (
    <>
      <Head>
        <title>Horror Articles - Splatter & Scream</title>
        <meta name="description" content="Articles on the latest and greatest horror." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://splatterandscream.com/articles" />

        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Splatter & Scream" />
        <meta property="og:url" content="https://splatterandscream.com/articles" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Horror Articles - Splatter & Scream" />
        <meta
          property="og:description"
          content="Articles on the latest and greatest horror."
        />
        <meta property="og:image" content={entries[0].Details!.FeaturedImage as unknown as string} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://splatterandscream.com/articles" />
        <meta name="twitter:title" content="Horror Articles - Splatter & Scream" />
        <meta name="twitter:description" content="Articles on the latest and greatest horror." />
        <meta name="twitter:image" content={entries[0].Details!.FeaturedImage as unknown as string} />
        <meta name="twitter:site" content="@splatternscream" />
      </Head>
      {entries && entries.length > 0 && (
        <ContentSection entries={entries} sectionName="articles" />
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const entries: Entries<Review> = await getEntries('');
  const filtered = entries.All && entries.All.length > 0 ? entries.All.filter(i => i.Type === 'article') : entries;

  return { props: { entries: filtered }, revalidate: 10 };
};

export default Articles;
