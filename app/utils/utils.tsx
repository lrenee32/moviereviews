import { Text, Node } from 'slate';
import { Entry, Review } from './types';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { ReactNode } from 'react';

export const toTitleCase = (str: string) => {
  return str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

export const serializeToText = (nodes: Entry<Review>["Content"]) => {
  return nodes.map(n => Node.string(n)).join('\n');
};

export const serializeToJSX = (node: Node, index: number) => {
  if (Text.isText(node)) {
    let string: ReactNode | string = node.text;
    if (node.bold) {
      string = <strong>{string}</strong>;
    }
    if (node.code) {
      string = <code>{string}</code>;
    }
    if (node.italic) {
      string = <em>{string}</em>;
    }
    if (node.underline) {
      string = <u>{string}</u>;
    }
    return <span key={`item-${index}`}>{string}</span>;
  };

  const children = node.children.map((n: Node, index: number) => serializeToJSX(n, index));

  switch (node.type) {
    case 'paragraph':
      return <p key={`item-${index}`}>{children}</p>;
    case 'h1':
      return <h1 key={`item-${index}`}>{children}</h1>;
    case 'h2':
      return <h2 key={`item-${index}`}>{children}</h2>;
    case 'h3':
      return <h3 key={`item-${index}`}>{children}</h3>;
    case 'h4':
      return <h4 key={`item-${index}`}>{children}</h4>;
    case 'bulleted-list':
      return <ul key={`item-${index}`}>{children}</ul>;
    case 'numbered-list':
      return <ol key={`item-${index}`}>{children}</ol>;
    case 'list-item':
      return <li key={`item-${index}`}>{children}</li>;
    case 'block-quote':
      return <blockquote key={`item-${index}`}>{children}</blockquote>;
    case 'link':
      return (
        <NextLink key={`item-${index}`} href={node.url} passHref>
          <Link href={node.url} target="_blank" underline="none">{children}</Link>
        </NextLink>
      );
    case 'image':
      return (
        <Box key={`item-${index}`}>
          <Box
            component="img"
            alt={node.caption}
            src={node.url}
            sx={{ width: '100%' }}
          />
          <Box sx={{ fontSize: '12px', mt: '5px', opacity: '0.5' }}>{node.caption}</Box>
        </Box>
      );
    default:
      break;
  }
};
