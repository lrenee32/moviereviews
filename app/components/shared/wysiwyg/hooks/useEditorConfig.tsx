import { Editor } from 'slate';
import { DefaultElement } from 'slate-react';

export const useEditorConfig = (editor: Editor) => {
  return { renderElement, renderLeaf };
};

const renderElement = (props) => {
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
    default:
      return <DefaultElement {...props} />;
  }
};

const renderLeaf = ({ attributes, children, leaf }) => {
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
