import { mergeAttributes, Node, NodeViewProps } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import React from "react";
import { CodeBlock } from "../menu/ui/code";

export const CodeNode = Node.create({
  name: "codeNode",
  group: "block",
  content: "inline*",

  addAttributes() {
    return {
      language: {
        default: "tsx",
        renderHTML: (attributes) => {
          return {
            language: attributes.language,
          };
        },
      },
      code: {
        default: "console.log('Hello, World!')",
        renderHTML: (attributes) => {
          return { code: attributes.code };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "code-node",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["code-node", mergeAttributes(HTMLAttributes), 0];
  },
  addNodeView() {
    return ReactNodeViewRenderer(CodeNodeEditorView);
  },
});

export const CodeNodeEditorView: React.FC<NodeViewProps> = ({ node }) => {
  return (
    <NodeViewWrapper>
      <CodeBlock code={node.attrs.code} language={node.attrs.language} />
    </NodeViewWrapper>
  );
};

export const CodeNodeEditorRender = (props: { node: any }) => {
  const code = props.node.attrs.code || "console.log('Hello, World!')";
  const language = props.node.attrs.language || "tsx";

  return <CodeBlock code={code} language={language} />;
};
