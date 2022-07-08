import { FunctionComponent } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GenericTable } from 'components/shared/generic-table';

const AdminProfile: FunctionComponent = () => {
  const updateReview = () => {
    console.log('update');
  };

  const deleteReview = () => {
    console.log('delete');
  };

  const columns = [
    { text: 'title' },
    { text: 'review' },
  ];

  const rows = [
    { title: 'A Movie', review: 'Good' },
    { title: 'Another movie', review: 'Great' },
  ];

  const actions = [
    <EditIcon key="update" onClick={() => updateReview()} />,
    <DeleteIcon key="delete" onClick={() => deleteReview()} />
  ];
  
  return (
    <Container sx={{ marginY: '100px' }}>
      <Typography variant="h3" marginBottom={'30px'}>View Reviews</Typography>
      <GenericTable columns={columns} rows={rows} actions={actions} />
    </Container>
  );
};

export default AdminProfile;