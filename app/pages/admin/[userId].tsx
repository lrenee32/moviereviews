import { FunctionComponent } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { GenericTable } from 'components/shared/generic-table';

const AdminProfile: FunctionComponent = () => {
  const columns = [
    { text: 'title' },
    { text: 'review' },
  ];

  const rows = [
    { title: 'A Movie', review: 'Good' },
    { title: 'Another movie', review: 'Great' },
  ];
  
  return (
    <Container sx={{ marginY: '100px' }}>
      <Typography variant="h3" marginBottom={'30px'}>View Reviews</Typography>
      <GenericTable columns={columns} rows={rows} />
    </Container>
  );
};

export default AdminProfile;