import { FunctionComponent, useMemo, Dispatch, SetStateAction } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useEditorConfig } from './hooks/useEditorConfig';

import Box from '@mui/material/Box';
import { Toolbar } from './Toolbar';

import styles from './Editor.module.scss';

interface Props {
  value: Descendant[],
  setValue: Dispatch<SetStateAction<Descendant[]>>,
}

export const Editor: FunctionComponent<Props> = ({ value, setValue }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderLeaf, renderElement } = useEditorConfig(editor);

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <Box className={styles["editor-container"]}>
        <Toolbar />
        <Box className={styles["editor-text-container"]}>
          <Editable
            renderElement={(props) => renderElement(props, true)}
            renderLeaf={renderLeaf}
          />
        </Box>
      </Box>
    </Slate>
  );
};
