import { FunctionComponent } from 'react';
import { Entries, Review } from 'utils/types';
import Box from '@mui/material/Box';
import { LatestReviews as LatestReviewsBox } from './latest-reviews';
import { SectionDivider } from 'components/shared/section-divider';
import { ContentCard } from 'components/shared/content/content-card';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material';

interface Props {
  entries: Entries<Review>,
};

export const LatestHeadlines: FunctionComponent<Props> = (props: Props) => {
  const { All, LatestReviews } = props.entries;
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <>
      <SectionDivider text="Latest Headlines" />
      <Box display="flex">
        <Box width={isLg ? '70%' : '100%' } sx={{ mr: isLg ? '20px' : '0px' }}>
          {All && All.data && All.data.length > 0 && All.data.map(entry => (
            <ContentCard key={`${entry.PK}-latest-headlines`} entry={entry} sectionName="latest-headlines" />
          ))}
        </Box>
        {isLg && (
          <Box width="30%" position="sticky" alignSelf="flex-start" top="70px">
            <LatestReviewsBox entries={LatestReviews.data} />
          </Box>
        )}
      </Box>
    </>
  );
};
