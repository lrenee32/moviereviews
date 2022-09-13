import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export const ListType = ['bulleted-list', 'numbered-list'];

export type ListType = 'bulleted-list' | 'numbered-list';

export type BlockType = 'block-quote' | 'list-item' | 'h1' | 'h2' | 'h3' | 'h4' | 'paragraph' | 'link' | 'link-editor' | 'image' | 'video' | ListType;

export type MarkType = 'bold' | 'italic' | 'underline' | 'code';

interface CustomElement {
  type: BlockType,
  url?: string,
  videoId?: string,
  file?: File,
  caption?: string,
  children: CustomText[],
};

interface Marks {
  bold?: boolean,
  italic?: boolean,
  underline?: boolean,
  code?: boolean,
};

interface CustomText extends Marks, CustomElement {
  text: string,
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor,
    Element: CustomElement,
    Text: CustomText,
    Node: { type: string },
  }
}