import { FunctionComponent, useMemo, Dispatch, SetStateAction } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useEditorConfig } from './hooks/useEditorConfig';

import Box from '@mui/material/Box';

interface Props {
  value: Descendant[],
}

export const ReadOnly: FunctionComponent<Props> = ({ value }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderLeaf, renderElement } = useEditorConfig(editor);

  return (
    <Slate editor={editor} value={value}>
      <Box mb="30px">
        <Editable
          readOnly
          renderElement={(props) => renderElement(props, false)}
          renderLeaf={renderLeaf}
        />
      </Box>
    </Slate>
  );
};
