import { FunctionComponent, useState, useCallback } from 'react';
import { Editor, Transforms } from 'slate';
import { RenderElementProps, useSlate } from 'slate-react';
import isHotkey from 'is-hotkey';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const Image: FunctionComponent<RenderElementProps> = ({ attributes, children, element }) => {
  const [isEditingCaption, setEditingCaption] = useState<boolean>(false);
  const [caption, setCaption] = useState(element.caption);
  const editor = useSlate();

  const applyCaptionChange = useCallback(
    (captionInput) => {
      const imageNodeEntry = Editor.above(editor, {
        match: (n) => n.type === "image",
      });
      if (imageNodeEntry == null) {
        return;
      }

      if (captionInput != null) {
        setCaption(captionInput);
      }

      Transforms.setNodes(
        editor,
        { caption: captionInput },
        { at: imageNodeEntry[1] }
      );
    },
    [editor, setCaption]
  );

  const onCaptionChange = useCallback(
    (event) => {
      setCaption(event.target.value);
    },
    [setCaption]
  );

  const onKeyDown = useCallback(
    (event) => {
      if (!isHotkey('enter', event)) {
        return;
      }
      event.preventDefault();

      applyCaptionChange(event.target.value);
      setEditingCaption(false);
    },
    [applyCaptionChange, setEditingCaption]
  );

  const onToggleCaptionEditMode = useCallback(
    (event) => {
      const wasEditing = isEditingCaption;
      setEditingCaption(!isEditingCaption);
      wasEditing && applyCaptionChange(caption);
    },
    [isEditingCaption, caption]
  );

  return (
    <Box contentEditable={false} {...attributes}>
      <Box>
        <Box
          component="img"
          alt={caption}
          src={element.url}
          sx={{ width: '100%' }}
        />
        {isEditingCaption ? (
          <TextField
            label="Enter caption here"
            value={caption}
            onChange={onCaptionChange}
            onKeyDown={onKeyDown}
            onBlur={onToggleCaptionEditMode}
          />
        ) : (
          <Box sx={{ fontSize: '12px', mt: '5px', opacity: '0.5' }} onClick={onToggleCaptionEditMode}>{element.caption}</Box>
        )}
      </Box>
      {children}
    </Box>
  );
};
