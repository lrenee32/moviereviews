import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import Image from 'next/future/image';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import SvgIcon from '@mui/material/SvgIcon';
import NoSsr from '@mui/material/NoSsr';
import SplatterIcon from 'public/images/hand-splatter.svg';
import { ReadOnly } from 'components/shared/wysiwyg/ReadOnly';
import { LatestReviews as LatestReviewsBox } from 'components/index/latest-reviews';
import { Nav } from 'components/shared/nav/nav';
import { Footer } from 'components/shared/nav/footer';
import { DisqusComments } from 'components/index/comment-section';
import { getEntry, getEntries } from 'services/api/entries/entries';
import { Entries, Entry, Review } from 'utils/types';
import { serializeToText, toTitleCase } from 'utils/utils';
import { GetServerSideProps } from 'next/types';
import { VARIABLES } from 'assets/themes/themes';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import format from 'date-fns/format';
import styles from 'assets/styles/entry.module.scss';


interface Props {
  entry: Entry<Review>,
  LatestReviews: Entries<Review>["LatestReviews"],
};

const EntryDetails: FunctionComponent<Props> = (props: Props) => {
  const { entry, LatestReviews } = props;
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <>
      <Head>
        <title>{`${entry.Title} - Splatter & Scream`}</title>
        <meta name="description" content={serializeToText(entry.Content)} />
        <meta name="author" content="Splatter & Scream" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`https://splatterandscream.com/entry/${entry.PK}`} />

        <meta property="article:publisher" content="https://www.facebook.com/splatterandscream" />
        <meta property="article:author" content="https://www.facebook.com/splatterandscream" />
        <meta property="article:published_time" content={new Date(entry.Created).toISOString()} />

        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Splatter & Scream" />
        <meta property="og:url" content={`https://splatterandscream.com/entry/${entry.PK}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={entry.Title} />
        <meta
          property="og:description"
          content={serializeToText(entry.Content)}
        />
        <meta property="og:image" content={entry.Details!.FeaturedImage as unknown as string} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://splatterandscream.com/entry/${entry.PK}`} />
        <meta name="twitter:title" content={entry.Title} />
        <meta name="twitter:description" content={serializeToText(entry.Content)} />
        <meta name="twitter:image" content={entry.Details!.FeaturedImage as unknown as string} />
        <meta name="twitter:creator" content="@https://twitter.com/splatternscream" />
        <meta name="twitter:site" content="@splatternscream" />
      </Head>
      <Box className={styles['wrapper']}>
        <Container maxWidth="lg" className={styles['container']}>
          <Nav style="large" />
          <Typography
            id="back-to-top-anchor"
            className={styles['entry-type']}
          >
            {toTitleCase(entry.EntryType)}
          </Typography>
          <Typography variant="h2" className={styles['entry-title']}>
            {entry.Title}
          </Typography>
          <NoSsr>
            <Typography className={styles['entry-subtitle']}>
            {`Published ${formatDistanceToNowStrict(entry.Created) } ago on ${format(new Date(entry.Created), 'PP')}`}
          </Typography>
          </NoSsr>
          <Box className={styles['inner-wrapper']}>
            <Box className={styles['inner-container']}>
              <Image
                src={entry.Details!.FeaturedImage as unknown as string}
                alt={`${entry.PK}-featured-image`}
                fill
                className={styles['entry-featured-image']}
              />
              <Box className={styles['content-container']}>
                <ReadOnly value={entry.Content} />
                {entry.EntryType === 'review' && (
                  <Rating
                    readOnly
                    value={entry?.UserRating}
                    precision={0.5}
                    max={10}
                    className={styles['entry-rating']}
                    icon={
                      <SvgIcon component={SplatterIcon} inheritViewBox fontSize="inherit" sx={{ color: VARIABLES.primaryColor }} />
                    }
                    emptyIcon={
                      <SvgIcon component={SplatterIcon} inheritViewBox fontSize="inherit" />
                    }
                  />
                )}
                <Box className={styles['entry-tags']}>
                  <Typography className={styles['title']}>Related Topics:</Typography>
                  {entry.Tags.map(i => (
                    <NextLink key={i} href={{ pathname: '/search', query: { s: i } }} passHref>
                      <Link>
                        <Typography className={styles['tags']}>{`#${i}`}</Typography>
                      </Link>
                    </NextLink>
                  ))}
                </Box>
                <DisqusComments
                  url={`${process.env.NEXT_PUBLIC_HOSTNAME}/entry/${entry.PK}`}
                  identifier={entry.PK}
                  title={entry.Title}
                />
              </Box>
            </Box>
            {isLg && (
              <Box className={styles['side-container']}>
                <LatestReviewsBox entries={LatestReviews.data} />
              </Box>
            )}
          </Box>
          <Footer />
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const entry: Entry<Review> = await getEntry(id);
  const LatestReviews: Entries<Review> = await getEntries(null, 'review', null, null, 4);

  return { props: { entry, LatestReviews } };
};

export default EntryDetails;
