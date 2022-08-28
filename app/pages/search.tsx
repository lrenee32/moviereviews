import { FunctionComponent, useState } from 'react';
import Head from 'next/head';
import Fuse from 'fuse.js';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Nav } from 'components';
import { Footer } from 'components/shared/nav/footer';
import { ContentCard } from 'components/shared/content/content-card';
import { getEntries } from 'services/api/entries/entries';
import { Entries, Entry, Review } from 'utils/types';
import { GetStaticProps } from 'next/types';
import styles from 'assets/styles/content-section.module.scss';
import cardStyles from 'assets/styles/content-card.module.scss';
import { LatestReviews } from 'components/index/latest-reviews';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props {
  entries: Entries<Review>,
};

export const Search: FunctionComponent<Props> = (props: Props) => {
  const { entries } = props;
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const router = useRouter();
  const { s } = router.query;
  const [ searchResults, setSearchResults ] = useState<Entry<Review>[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (entries.All && entries.All.length > 0 && s !== undefined) {
      const options = {
        includeScore: true,
        useExtendedSearch: true,
        keys: [
          'Title',
          'Content.children.text',
          'Details.FilmTitle',
          'Details.FilmOverview',
          'Tags',
        ],
      };
      const fuse = new Fuse(entries.All, options);
      const results = fuse.search(`'${s ?? ''}`);
      setSearchResults(results.map(i => i.item));
      setLoading(false);
    }
  }, [entries.All, s]);  

  return (
    <>
      <Head>
        <title>{`Search for ${s} - Splatter & Scream`}</title>
      </Head>
      <Box className={styles['wrapper']}>
        <Container maxWidth="lg" className={styles['container']}>
          <Nav style="large" />
          <Typography pt="20px" variant="h4" textAlign="center" id="back-to-top-anchor">
            {`Search results for "${s}"`}
          </Typography>
          <Box display="flex">
            <Box width={isLg ? '70%' : '100%' } sx={{ mr: isLg ? '20px' : '0px' }}>
              {loading ? (
                <>
                  {[...Array(3)].map((_i, index) => (
                    <Skeleton key={`skeleton-${index}`} className={cardStyles['card']} height={202.98} variant="rectangular" />
                  ))}
                </>
              ) : (
                <>
                  {searchResults.map(entry => (
                    <ContentCard key={`${entry.EntryId}-latest-headlines`} entry={entry} sectionName="latest-headlines" />
                  ))}
                </>
              )}
            </Box>
            {isLg && (
              <Box width="30%" position="sticky" alignSelf="flex-start" top="70px">
                <LatestReviews entries={entries.All} />
              </Box>
            )}
          </Box>
          <Footer />
        </Container>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const entries: Entries<Review> = await getEntries('');

  return { props: { entries }, revalidate: 10 };
};

export default Search;
