import {
  NodeHandlers,
  TipTapNode,
  TipTapRender,
} from "@troop.com/tiptap-react-render";
import { doc } from "./doc";
import { heading } from "./heading";
import { paragraph } from "./paragraph";
import { text } from "./text";
import { CodeNodeEditorRender } from "../extensions/code-node";
import { ImageNodeEditorRender } from "../extensions/image-node";

const handlers: NodeHandlers = {
  doc: doc,
  text: text,
  paragraph: paragraph,
  heading: heading,
  codeNode: (props) => {
    return <CodeNodeEditorRender node={props.node} />;
  },
  hardBreak: () => {
    return <br />;
  },
  listItem: ({ children }) => {
    return <li>{children}</li>;
  },
  bulletList: ({ children }) => {
    return <ul>{children}</ul>;
  },
  imageNode: (props) => {
    return <ImageNodeEditorRender node={props.node} />;
  },
};

export const RenderPost = (props: { data: TipTapNode }) => {
  return <TipTapRender handlers={handlers} node={props.data} />;
};
