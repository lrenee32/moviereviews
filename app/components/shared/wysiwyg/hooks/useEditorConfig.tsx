import { Editor } from 'slate';
import { DefaultElement, RenderElementProps, RenderLeafProps } from 'slate-react';
import Divider from '@mui/material/Divider';
import { Link } from '../Link';
import { Image } from '../Image';
import { Video } from '../Video';
import isHotkey, { HotKeyOptions } from 'is-hotkey';
import { toggleStyle } from '../utils/EditorUtils';

export const useEditorConfig = (editor: Editor) => {
  const { isVoid, isInline } = editor;

  editor.isVoid = (element) => {
    if (element.type === 'image' || element.type === 'video' || element.type === 'hr') {
      return true;
    }
    return isVoid(element);
  };

  editor.isInline = (element) => {
    if (element.type === 'link') {
      return true;
    }
    return isInline(element);
  };

  return { renderElement, renderLeaf, KeyBindings };
};

const renderElement = (props: RenderElementProps, isEditing: boolean) => {
  const { element, children, attributes } = props;
  switch (element.type) {
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
    case 'h1':
      return <h1 {...attributes}>{children}</h1>;
    case 'h2':
      return <h2 {...attributes}>{children}</h2>;
    case 'h3':
      return <h3 {...attributes}>{children}</h3>;
    case 'h4':
      return <h4 {...attributes}>{children}</h4>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'hr':
      return <><Divider sx={{ marginY: '30px' }} />{children}</>;
    case 'link':
      return <Link {...props} isEditing={isEditing} />;
    case 'image':
      return <Image {...props} isEditing={isEditing} />;
    case 'video':
      return <Video {...props} />
    default:
      return <DefaultElement {...props} />;
  }
};

const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong {...attributes}>{children}</strong>;
  }

  if (leaf.code) {
    children = <code {...attributes}>{children}</code>;
  }

  if (leaf.italic) {
    children = <em {...attributes}>{children}</em>;
  }

  if (leaf.underline) {
    children = <u {...attributes}>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const KeyBindings = {
  onKeyDown: (editor: Editor, event: HotKeyOptions) => {
    if (isHotkey('mod+b', event)) {
      return toggleStyle(editor, 'bold');
    }
    if (isHotkey('mod+i', event)) {
      return toggleStyle(editor, 'italic');
    }
    if (isHotkey('mod+c', event)) {
      return toggleStyle(editor, 'code');
    }
    if (isHotkey('mod+u', event)) {
      return toggleStyle(editor, 'underline');
    }
  }
}
