import { FunctionComponent } from 'react';
import { Reviews } from '../../../utils/types';
import { getReviews } from '../../../services/api/admin/admin';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GenericTable } from 'components/shared/generic-table';
import { GetStaticProps, GetStaticPaths } from 'next/types';

interface Props {
  reviews: Reviews[],
};

const AdminProfile: FunctionComponent<Props> = (props: Props) => {
  const { reviews } = props;

  const updateReview = () => {
    console.log('update');
  };

  const deleteReview = () => {
    console.log('delete');
  };

  const columns = [
    { text: 'Title' },
    { text: 'Review' },
  ];

  const actions = [
    <EditIcon key="update" onClick={() => updateReview()} />,
    <DeleteIcon key="delete" onClick={() => deleteReview()} />
  ];
  
  return (
    <Container sx={{ marginY: '100px' }}>
      <Typography variant="h3" marginBottom={'30px'}>Manage Reviews</Typography>
      {(reviews && reviews.length > 0) && (
        <GenericTable columns={columns} rows={reviews} actions={actions} />
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