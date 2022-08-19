import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import SvgIcon from '@mui/material/SvgIcon';
import SplatterIcon from 'public/images/hand-splatter.svg';
import { ReadOnly } from 'components/shared/wysiwyg/ReadOnly';
import { LatestReviews } from 'components/index/latest-reviews';
import { Nav } from 'components/shared/nav/nav';
import { Footer } from 'components/shared/nav/footer';
import { DisqusComments } from 'components/index/comment-section';
import { getEntries } from 'services/api/entries/entries';
import { Entries, Entry, Review } from 'utils/types';
import { toTitleCase } from 'utils/utils';
import { GetStaticProps, GetStaticPaths } from 'next/types';
import { VARIABLES } from 'assets/themes/themes';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import format from 'date-fns/format';
import styles from 'assets/styles/entry.module.scss';


interface Props {
  entry: Entry<Review>,
  entries: Entries<Review>,
};

const EntryDetails: FunctionComponent<Props> = (props: Props) => {
  const { entry, entries } = props;
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <Box className={styles['wrapper']}>
      <Container maxWidth="lg" className={styles['container']}>
        <Nav style="large" />
        <Typography
          id="back-to-top-anchor"
          className={styles['entry-type']}
        >
          {toTitleCase(entry.Type)}
        </Typography>
        <Typography variant="h2">
          {entry.Title}
        </Typography>
        <Typography className={styles['entry-subtitle']}>
          {`Published ${formatDistanceToNowStrict(entry.Created) } ago on ${format(new Date(entry.Created), 'PP')}`}
        </Typography>
        <Box className={styles['inner-wrapper']}>
          <Box className={styles['inner-container']}>
            <Box
              component="img"
              alt={`${entry.EntryId}-featured-image`}
              src={entry.Details!.FeaturedImage}
              className={styles['entry-featured-image']}
            />
            <Box className={styles['content-container']}>
              <ReadOnly value={entry.Content} />
              {entry.Type === 'review' && (
                <Rating
                  readOnly
                  value={entry.Details?.UserRating}
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
                url={`${process.env.NEXT_PUBLIC_HOSTNAME}/entry/${entry.EntryId}`}
                identifier={entry.EntryId}
                title={entry.Title}
              />
            </Box>
          </Box>
          {isLg && (
            <Box className={styles['side-container']}>
              <LatestReviews entries={entries.All} />
            </Box>
          )}
        </Box>
        <Footer />
      </Container>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const entries: Entries<Review> = await getEntries('');
  const entry: Entry<Review> | undefined = entries.All!.find(i => i.EntryId === id);

  return { props: { entry, entries } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const entries: Entries<Review> = await getEntries('');

  const paths = entries.All.map((entry) => ({
    params: { id: entry.EntryId },
  }));

  return { paths, fallback: 'blocking' };
};

export default EntryDetails;
