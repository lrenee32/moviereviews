import { FunctionComponent, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { RichTextEditor } from '../../../../components/shared/rich-text-editor/rich-text-editor';

interface Props {

};

const CreateReview: FunctionComponent = (props: Props) => {
  const initialValue = [
    {
      type: "paragraph",
      children: [
        { text: "This is editable " },
        { text: "rich", bold: true },
        { text: " text, " },
        { text: "much", italic: true },
        { text: " better than a " },
        { text: "<textarea>", code: true },
        { text: "!" }
      ]
    },
    {
      type: "paragraph",
      children: [
        {
          text:
            "Since it's rich text, you can do things like turn a selection of text "
        },
        { text: "bold", bold: true },
        {
          text:
            ", or add a semantically rendered block quote in the middle of the page, like this:"
        }
      ]
    },
    {
      type: "block-quote",
      children: [{ text: "A wise quote." }]
    },
    {
      type: "paragraph",
      children: [{ text: "Try it out for yourself!" }]
    }
  ];
  const [input, setInput] = useState(initialValue);
  

  return (
    <Container sx={{ marginY: '100px' }}>
      <Typography variant="h3" marginBottom={'30px'}>Create Review</Typography>
      <TextField fullWidth label="Title" id="title" />
      <RichTextEditor value={input} setValue={setInput} />
    </Container>
  );
};

export default CreateReview;
