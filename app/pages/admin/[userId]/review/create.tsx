import { FunctionComponent, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ReviewForm } from '../../../../components/admin/form';
import { Descendant } from 'slate';
import { createReview } from 'services/api/admin/admin';
import { Review } from 'utils/types';

interface Props {
  userId: Review["UserId"],
}

const CreateReview: FunctionComponent<Props> = (props: Props) => {
  const router = useRouter();
  const { userId } = props;
  const initialValues: { title: string, details: any, input: Descendant[] } = {
    title: '',
    details: {},
    input: [{ type: 'paragraph', children: [ { text: '' }]}],
  };
  const [title, setTitle] = useState<string>(initialValues.title);
  const [details, setDetails] = useState<any>(initialValues.details);
  const [input, setInput] = useState<Descendant[]>(initialValues.input);

  const routeToAdmin: () => void = () => {
    return router.push(`/admin/${userId}`);
  };

  const create: () => void = async () => {
    const body = {
      Title: title,
      Review: input,
      Year: details.year,
      TMDBId: details.TMDBId,
      Rating: details.Rating,
    };
    return createReview(userId, body)
      .then(() => routeToAdmin);
  };
  
  return (
    <Container sx={{ marginY: '100px' }}>
      <Typography variant="h3" marginBottom="30px">Create Review</Typography>
      <ReviewForm actions={{ titleAction: setTitle, autocompleteAction: setDetails, inputAction: setInput, cancelAction: routeToAdmin, formAction: create }} values={{ title, input }} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const userId = context.params?.userId;

  return { props: { userId } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = ['a5c723d5-89ba-4554-a09d-ee3870be41a3'].map((userId) => ({
    params: { userId },
  }));

  return { paths, fallback: 'blocking' };
};

export default CreateReview;
