import imageExtensions from 'image-extensions';
import isUrl from 'is-url';
import { Editor, Node, Path, Range, Transforms } from 'slate';

const isImageUrl = url => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  return imageExtensions.includes(ext);
};

export const withImages = editor => {
  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  };

  editor.insertData = data => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  };

  return editor;
};

export const insertImage = (editor, url, caption) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text], caption };
  Transforms.insertNodes(editor, image);
};

export const withCorrectVoidBehavior = editor => {
  const { deleteBackward, insertBreak } = editor

  // if current selection is void node, insert a default node below
  editor.insertBreak = () => {
    if (!editor.selection || !Range.isCollapsed(editor.selection)) {
      return insertBreak()
    }

    const selectedNodePath = Path.parent(editor.selection.anchor.path)
    const selectedNode = Node.get(editor, selectedNodePath)
    if (Editor.isVoid(editor, selectedNode)) {
      Editor.insertNode(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
      })
      return
    }

    insertBreak()
  }
    
  // if prev node is a void node, remove the current node and select the void node
  editor.deleteBackward = unit => {
    if (
      !editor.selection ||
      !Range.isCollapsed(editor.selection) ||
      editor.selection.anchor.offset !== 0
    ) {
      return deleteBackward(unit)
    }

    const parentPath = Path.parent(editor.selection.anchor.path)
    const parentNode = Node.get(editor, parentPath)
    const parentIsEmpty = Node.string(parentNode).length === 0

    if (parentIsEmpty && Path.hasPrevious(parentPath)) {
      const prevNodePath = Path.previous(parentPath)
      const prevNode = Node.get(editor, prevNodePath)
      if (Editor.isVoid(editor, prevNode)) {
        return Transforms.removeNodes(editor)
      }
    }

    deleteBackward(unit)
  }

  return editor
}