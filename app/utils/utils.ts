import escapeHTML from 'escape-html';
import { Text, Node } from 'slate';

export const serializeToText = (nodes) => {
  return nodes.map(n => Node.string(n)).join('\n');
};

export const serializeToHTML = (node) => {
  if (Text.isText(node)) {
    let string = escapeHTML(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    return string
  };

  const children = node.children.map(n => serializeToHTML(n)).join('');

  switch (node.type) {
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`
    case 'paragraph':
      return `<p>${children}</p>`
    case 'link':
      return `<a href="${escapeHTML(node.url)}">${children}</a>`
    default:
      return children
  };
};
