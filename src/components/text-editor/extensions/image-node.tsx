import React from "react";
import { mergeAttributes, Node, NodeViewProps } from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import BlurImage from "@/components/utils/blur-image";

export const ImageNode = Node.create({
  name: "imageNode",
  group: "block",
  content: "inline*",
  addAttributes() {
    return {
      alt: {
        default: "image-description",
        renderHTML: (attributes) => {
          return {
            alt: attributes.alt,
          };
        },
      },
      src: {
        default: "https://via.placeholder.com/150",
        renderHTML: (attributes) => {
          return {
            src: attributes.src,
          };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "image-node",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["image-node", mergeAttributes(HTMLAttributes), 0];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeEditorView);
  },
});

export const ImageNodeEditorView: React.FC<NodeViewProps> = ({ node }) => {
  return (
    <NodeViewWrapper>
      <NodeViewContent>
        <BlurImage src={node.attrs.src} alt={node.attrs.alt} />
      </NodeViewContent>
    </NodeViewWrapper>
  );
};

export const ImageNodeEditorRender = (props: { node: any }) => {
  const src = props.node.attrs.src || "https://via.placeholder.com/150";
  const alt = props.node.attrs.alt || "image-description";
  return <BlurImage src={src} alt={alt} />;
};
