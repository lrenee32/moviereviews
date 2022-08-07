import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export const ListType = ['bulleted-list', 'numbered-list'];

export type ListType = 'bulleted-list' | 'numbered-list';

export type BlockType = 'block-quote' | 'bulleted-list' | 'heading-one' | 'heading-two' | 'paragraph' | 'link' | 'image' | ListType;

export type MarkType = 'bold' | 'italic' | 'underline' | 'code';

interface CustomElement {
  type: BlockType,
  url?: string,
  children: CustomText[],
};

interface Marks {
  bold?: boolean,
  italic?: boolean,
  underline?: boolean,
  code?: boolean,
};

interface CustomText extends Marks {
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