import { FunctionComponent } from 'react';
import { getEntries } from 'services/api/entries/entries';
import { Entries, Review } from 'utils/types';
import { GetStaticProps } from 'next/types';
import { ContentSection } from 'components/shared/content/content-section';

interface Props {
  entries: Entries<Review>["All"],
};

export const Reviews: FunctionComponent<Props> = (props: Props) => {
  const { entries } = props;

  return (
    <>
      {entries && entries.length > 0 && (
        <ContentSection entries={entries} sectionName="reviews" />
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const entries: Entries<Review> = await getEntries('');
  const filtered = entries.All && entries.All.length > 0 ? entries.All.filter(i => i.Type === 'review') : entries;

  return { props: { entries: filtered } };
};

export default Reviews;
