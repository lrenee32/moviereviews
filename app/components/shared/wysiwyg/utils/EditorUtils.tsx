// @ts-nocheck

import { Editor, Element, Range, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { ListType } from './Typings';

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

  return (blockType !== "image" || blockType !== "video") ? blockType : null;
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
        file,
        children: [{ text: '' }],
      },
      { at: selection, select: true },
    );
  };
  reader.readAsDataURL(file);
}

export const createLinkNode = (url, text) => ({
  type: "link",
  url,
  children: [{ text }]
});

export const insertLink = (editor, url) => {
  if (!url) return;

  const { selection } = editor;
  const link = createLinkNode(url, "New Link");

  ReactEditor.focus(editor);

  if (!!selection) {
    const [parentNode, parentPath] = Editor.parent(
      editor,
      selection.focus?.path
    );

    // Remove the Link node if we're inserting a new link node inside of another
    // link.
    if (parentNode.type === "link") {
      removeLink(editor);
    }

    if (editor.isVoid(parentNode)) {
      // Insert the new link after the void node
      Transforms.insertNodes(editor, createParagraphNode([link]), {
        at: Path.next(parentPath),
        select: true
      });
    } else if (Range.isCollapsed(selection)) {
      // Insert the new link in our last known locatio
      Transforms.insertNodes(editor, link, { select: true });
    } else {
      // Wrap the currently selected range of text into a Link
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: "end" });
    }
  } else {
    // Insert the new link node at the bottom of the Editor when selection
    // is falsey
    Transforms.insertNodes(editor, createParagraphNode([link]));
  }
};

export const removeLink = (editor, opts = {}) => {
  Transforms.unwrapNodes(editor, {
    ...opts,
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "link"
  });
};

export const hasActiveLinkAtSelection = (editor) => {
  return isLinkNodeAtSelection(editor, editor.selection);
};

export const isLinkNodeAtSelection = (editor, selection) => {
  if (selection == null) {
    return false;
  }

  return (
    Editor.above(editor, {
      at: selection,
      match: (n) => n.type === "link",
    }) != null
  );
};

export const insertVideo = (editor: Editor, videoId) => {
  if (!videoId) return;

  Transforms.insertNodes(
    editor,
    {
      type: 'video',
      videoId,
      children: [{
        text: '',
      }],
    },
  );
}
