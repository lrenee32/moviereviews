import { FunctionComponent } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReadOnly } from 'components/shared/rich-text-editor/readonly';
import { getEntries, getEntry } from 'services/api/entries/entries';
import { Entries, Entry, Review } from 'utils/types';
import { GetStaticProps, GetStaticPaths } from 'next/types';

interface Props {
  entry: Entry<Review>,
};

const EntryDetails: FunctionComponent<Props> = (props: Props) => {
  const { entry } = props;

  return (
    <Container fixed sx={{ paddingY: '100px' }}>
      <Box>
        <Typography variant="h2" marginBottom="15px">{entry.Title}</Typography>
      </Box>
      <ReadOnly value={entry.Content} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const entry: Review = await getEntry(id);

  return { props: { entry } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const entries: Entries<Review> = await getEntries('');

  const paths = entries.All.map((entry) => ({
    params: { id: entry.EntryId },
  }));

  return { paths, fallback: 'blocking' };
};

export default EntryDetails;
