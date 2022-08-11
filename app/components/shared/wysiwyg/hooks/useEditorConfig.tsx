import { Editor } from 'slate';
import { DefaultElement, RenderElementProps, RenderLeafProps } from 'slate-react';
import { Link } from '../Link';
import { LinkEditor } from '../LinkEditor';
import { Image } from '../Image';

export const useEditorConfig = (editor: Editor) => {
  const { isVoid, isInline } = editor;

  editor.isVoid = (element) => {
    if (element.type === 'image') {
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

  return { renderElement, renderLeaf };
};

const renderElement = (props: RenderElementProps) => {
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
    case 'link':
      return <Link {...props} />;
    // case 'link-editor':
    //   return <LinkEditor {...props} />
    case 'image':
      return <Image {...props} />;
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
