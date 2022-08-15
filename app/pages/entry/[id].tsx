import { FunctionComponent } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
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

interface Props {
  entry: Entry<Review>,
  entries: Entries<Review>,
};

const EntryDetails: FunctionComponent<Props> = (props: Props) => {
  const { entry, entries } = props;
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <Box sx={{ background: `linear-gradient(to bottom, #0D090A 85%, ${VARIABLES.primaryColor} 185%)`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Container maxWidth="lg" sx={{ background: VARIABLES.bgColor, boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.50);' }}>
        <Nav style="large" />
        <Typography
          sx={{
            backgroundColor: VARIABLES.primaryColor,
            padding: '2.5px 10px',
            transform: 'skewX(-15deg)',
            display: 'inline-block',
            mb: '10px',
          }}
        >
          {toTitleCase(entry.Type)}
        </Typography>
        <Typography variant="h2">
          {entry.Title}
        </Typography>
        <Typography mb="30px" sx={{ opacity: '.5'}}>
          {`Published ${formatDistanceToNowStrict(entry.Created) } ago on ${format(new Date(entry.Created), 'PP')}`}
        </Typography>
        <Box display="flex">
          <Box width={isLg ? '70%' : '100%'} pr={isLg && '20px'}>
            <Box
              component="img"
              alt={`${entry.EntryId}-featured-image`}
              src={entry.Details!.FeaturedImage}
              sx={{ width: '100%' }}
            />
            <Box ml={isLg && "80px"}>
              <ReadOnly value={entry.Content} />
              {entry.Type === 'review' && (
                <Rating
                  readOnly
                  value={entry.Details?.UserRating}
                  precision={0.5}
                  max={10}
                  sx={{ fontSize: '72px', '& > span': { width: '42px' }, mb: '20px' }}
                  icon={
                    <SvgIcon component={SplatterIcon} viewBox="72 72 600 375" fontSize="inherit" sx={{ color: VARIABLES.primaryColor }} />
                  }
                  emptyIcon={
                    <SvgIcon component={SplatterIcon} viewBox="72 72 600 375" fontSize="inherit" />
                  }
                />
              )}
              <Box display="flex" mb="30px">
                <Typography mr="5px">Related Topics:</Typography>
                {entry.Tags.map(i => (
                  <Typography key={i} mr="5px" sx={{ opacity: '.5' }}>{`#${i}`}</Typography>
                ))}
              </Box>
              <DisqusComments
                url={`https://localhost:3000/entry/${entry.EntryId}`}
                identifier={entry.EntryId}
                title={entry.Title}
              />
            </Box>
          </Box>
          {isLg && (
            <Box width="30%" position="sticky" alignSelf="flex-start" top="0">
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
