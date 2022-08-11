import { FunctionComponent, useMemo, Dispatch, SetStateAction } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useEditorConfig, withCorrectVoidBehavior } from './hooks/useEditorConfig';
import useSelection from './hooks/useSelection';

import Box from '@mui/material/Box';
import { Toolbar } from './Toolbar';

import styles from './Editor.module.scss';

interface Props {
  value: Descendant[],
  setValue: Dispatch<SetStateAction<Descendant[]>>,
}

export const Editor: FunctionComponent<Props> = ({ value, setValue }) => {
  const editor = useMemo(() => withCorrectVoidBehavior(withReact(createEditor())), []);
  const { renderLeaf, renderElement } = useEditorConfig(editor, selection, previousSelection);

  const [previousSelection, selection, setSelection] = useSelection(editor);

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <Box className={styles["editor-container"]}>
        <Toolbar previousSelection={previousSelection} />
        <Box className={styles["editor-text-container"]}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </Box>
      </Box>
    </Slate>
  );
};
