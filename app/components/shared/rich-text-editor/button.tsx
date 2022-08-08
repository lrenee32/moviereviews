import { FunctionComponent, ReactNode, Ref } from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import { BlockType, MarkType, ListType } from './typings';
import { Editor, Transforms } from 'slate';
import { useSlate } from 'slate-react';

type Type = 'block' | 'mark';

interface Props {
  type: Type,
  format: MarkType | BlockType,
  children: ReactNode,
  imageUpload?: Ref,
};

export const Button: FunctionComponent<Props> = (props: Props) => {
  const { type, format, children, imageUpload } = props;
  const editor = useSlate();

  const isActive = () => {
    switch (type) {
      case 'block':
        const [match] = Editor.nodes(editor, {
          match: n => n.type === format
        });
        return !!match;
      case 'mark':
        const marks = Editor.marks(editor);
        return marks && marks[format];
    }
  };

  const toggle = () => {
    switch (type) {
      case 'block':
        const isList = ListType.includes(format);
        const isImage = format === 'image';

        Transforms.unwrapNodes(editor, {
          match: n => ListType.includes(n.type),
          split: true
        });

        if (isImage) {
          return imageUpload.current.click();
        }
      
        Transforms.setNodes(editor, {
          type: isActive() ? "paragraph" : isList ? "list-item" : format
        });

        if (!isActive() && isList) {
          const block = { type: format, children: [] };
          Transforms.wrapNodes(editor, block);
        }

        return;
      case 'mark':
        return isActive()
          ? Editor.removeMark(editor, format)
          : Editor.addMark(editor, format, true);
    }
  };

  return (
    <Box m="10px">
      <ToggleButton
        value={format}
        selected={isActive()}
        onMouseDown={event => {
          event.preventDefault();
          toggle();
        }}
        sx={{ border: 'none', padding: '0' }}
      >
        {children}
      </ToggleButton>
    </Box>
  );
};