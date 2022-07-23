import { FunctionComponent } from 'react';
import { Reviews } from '../../../utils/types';
import { getReviews } from '../../../services/api/admin/admin';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MaterialTable, { MTableHeader } from 'material-table';
import { serializeToText } from '../../../utils/utils';
import { GetStaticProps, GetStaticPaths } from 'next/types';

interface Props {
  reviews: Reviews["all"],
};

const AdminProfile: FunctionComponent<Props> = (props: Props) => {
  const { reviews } = props;
  reviews.map(review => {
    if (typeof review.Review === 'object') {
      review.Review = serializeToText(review.Review);
    }
  });

  const tableData = {
    data: reviews,
    columns: [
      { title: 'Title', field: 'Title' },
      { title: 'Review', field: 'Review' },
    ],
    actions: [
      { icon: 'edit', onClick: (event, row) => alert(`You want to edit ${row.ReviewId}`)},
      { icon: 'delete', iconProps: { color: 'error' }, onClick: (event, row) => alert(`You want to delete ${row.ReviewId}`)},
    ],
    options: {
      actionsColumnIndex: -1,
      searchFieldAlignment: 'right',
      showTitle: false,
      draggable: false,
      headerStyle: { backgroundColor: 'inherit' }
    },
    style: {
      borderRadius: '10px',
    },
  }
  
  return (
    <Container sx={{ marginY: '100px' }}>
      <Typography variant="h3" marginBottom={'30px'}>Manage Reviews</Typography>
      {(reviews && reviews.length > 0) && (
        <MaterialTable
          columns={tableData.columns}
          data={tableData.data}
          actions={tableData.actions}
          options={tableData.options}
          style={tableData.style}
        />
      )}
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const userId = context.params?.userId;
  const reviews: Reviews = await getReviews(userId, '');

  return { props: { reviews } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = ['a5c723d5-89ba-4554-a09d-ee3870be41a3'].map((userId) => ({
    params: { userId },
  }));

  return { paths, fallback: 'blocking' };
};

export default AdminProfile;