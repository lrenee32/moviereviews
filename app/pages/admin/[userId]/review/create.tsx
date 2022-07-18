import { FunctionComponent, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ReviewForm } from '../../../../components/admin/form';
import { Descendant } from 'slate';

const CreateReview: FunctionComponent = () => {
  const initialValues: { title: string, input: Descendant[] } = {
    title: '',
    input: [{ type: 'paragraph', children: [ { text: '' }]}],
  };
  const [title, setTitle] = useState<string>(initialValues.title);
  const [input, setInput] = useState<Descendant[]>(initialValues.input);
  
  return (
    <Container sx={{ marginY: '100px' }}>
      <Typography variant="h3" marginBottom="30px">Create Review</Typography>
      <ReviewForm actions={{ titleAction: setTitle, inputAction: setInput }} values={{ title, input }} />
    </Container>
  );
};

export default CreateReview;
