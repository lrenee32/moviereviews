import { FunctionComponent, useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, withReact, Slate } from 'slate-react';
import { withHistory } from 'slate-history';
import { Element, Leaf } from './rich-text-editor';
import Box from '@mui/material/Box';


interface Props {
  value: Descendant[],
}

export const ReadOnly: FunctionComponent<Props> = (props: Props) => {
  const { value } = props;
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Box>
      <Slate
        editor={editor}
        value={value}
      >
        <Editable
          readOnly
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </Box>
  );
};