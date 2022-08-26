// @ts-nocheck

import { FunctionComponent, useMemo, useCallback, Dispatch, SetStateAction } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { useEditorConfig } from './hooks/useEditorConfig';

import Box from '@mui/material/Box';
import { Toolbar } from './Toolbar';

import styles from './Editor.module.scss';
import { HotKeyOptions } from 'is-hotkey';

interface Props {
  value: Descendant[],
  setValue: Dispatch<SetStateAction<Descendant[]>>,
}

export const Editor: FunctionComponent<Props> = ({ value, setValue }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { renderLeaf, renderElement, KeyBindings } = useEditorConfig(editor);

  const onKeyDown = useCallback(
    (event: HotKeyOptions) => KeyBindings.onKeyDown(editor, event),
    [KeyBindings, editor]
  );

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <Box className={styles["editor-container"]}>
        <Toolbar />
        <Box className={styles["editor-text-container"]}>
          <Editable
            renderElement={(props) => renderElement(props, true)}
            renderLeaf={renderLeaf}
            onKeyDown={onKeyDown}
          />
        </Box>
      </Box>
    </Slate>
  );
};
