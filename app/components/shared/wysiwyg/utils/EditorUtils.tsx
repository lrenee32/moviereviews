import { ListType } from 'components/shared/rich-text-editor/typings';
import { Editor, Transforms } from 'slate';

export const getActiveStyles = (editor: Editor) => {
  return new Set(Object.keys(Editor.marks(editor) ?? {}))
};

export const toggleStyle = (editor:Editor, style: string) => {
  const activeStyles = getActiveStyles(editor);
  if (activeStyles.has(style)) {
    Editor.removeMark(editor, style);
  } else {
    Editor.addMark(editor, style, true);
  }
};

export const getTextBlockStyle = (editor: Editor) => {
  const selection = editor.selection;
  if (selection == null) {
    return null;
  }

  const topLevelBlockNodesInSelection = Editor.nodes(editor, {
    at: editor.selection,
    mode: "highest",
    match: (n) => Editor.isBlock(editor, n),
  });

  let blockType = null;
  let nodeEntry = topLevelBlockNodesInSelection.next();
  while (!nodeEntry.done) {
    const [node] = nodeEntry.value;
    if (blockType == null) {
      blockType = node.type;
    } else if (blockType !== node.type) {
      return "multiple";
    }

    nodeEntry = topLevelBlockNodesInSelection.next();
  }

  return blockType !== "image" ? blockType : null;
}

export const toggleBlockType = (editor: Editor, blockType: string) => {
  const isList = ListType.includes(blockType);
  const currentBlockType = getTextBlockStyle(editor);
  const isActive = currentBlockType === blockType;
  const changeTo = isActive ? "paragraph" : isList ? "list-item" : blockType;
  Transforms.unwrapNodes(editor, {
    match: n => ListType.includes(n.type),
    split: true
  });
  Transforms.setNodes(
    editor,
    { type: changeTo },
    { at: editor.selection, match: (n) => Editor.isBlock(editor, n) }
  );

  if (!isActive && isList) {
    const block = { type: blockType, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const insertImageFile = (editor: Editor, files, selection) => {
  if (files.length === 0) {
    return;
  }
  const file = files[0];
  const fileName = file.name;
  const reader = new FileReader();
  reader.onload = (e) => {
    const url = e.target.result;
    Transforms.insertNodes(
      editor,
      {
        type: 'image',
        caption: fileName,
        url,
        children: [{ text: '' }],
      },
      { at: selection, select: true },
    );
  };
  reader.readAsDataURL(file);
}
